import CryptoES from 'crypto-es'
import * as R from 'ramda'
import DeviceInfo from 'react-native-device-info'
import { call, put, select } from 'redux-saga/effects'

import getHasSessionExpired from './getHasSessionExpired'

import { createAction } from '../../actions/createAction'
import { ILoginStarted } from '../../actions/security/ILoginStarted'
import { login as loginApi } from '../../api/security/login'
import { loadSecuritySession, saveSecuritySession } from '../../data/security'
import { ISecuritySession } from '../../models/currentInterfaces'
import ResponseError from '../../models/internal/responseError'
import { getApiKey } from '../../selectors/configuration/getApiKey'
import { getApiUri } from '../../selectors/configuration/getApiUri'
import { getApiCallTimeoutInMilliseconds } from '../../selectors/configuration/getApiCallTimeoutInMilliseconds'
import { getIsApiStubbed } from '../../selectors/configuration/getIsApiStubbed'
import { getIsConnected } from '../../selectors/networkConnection/getIsConnected'
import { getIsInternetReachable } from '../../selectors/networkConnection/getIsInternetReachable'
import { getIsOfflineLoginEnabled } from '../../selectors/security/getIsOfflineLoginEnabled'
import { getIsOnlineLoginRequired } from '../../selectors/security/getIsOnlineLoginRequired'
import { getRealm } from '../../selectors/realm/getRealm'

const hashCount = 10

function hashPassword(password: string, username: string): string {
  const deviceId = DeviceInfo.getUniqueId()
  const inputString = `${username}|${password}|${deviceId}`

  let hashDigest = inputString
  for (let hashIteration = 0; hashIteration < hashCount; hashIteration += 1) {
    hashDigest = CryptoES.SHA512(hashDigest).toString()
  }

  return hashDigest
}

export default function* executeLogin(
  action: ILoginStarted,
): Generator<any, void, any> {
  if (
    R.isNil(action.username) ||
    R.isEmpty(action.username) ||
    R.isNil(action.password) ||
    R.isEmpty(action.password)
  ) {
    yield put(
      createAction('LoginFailed', {
        error: ResponseError.createResponseError(
          0,
          'saga_error_missing_username_or_password',
        ),
      }),
    )
    return
  }

  const isConnected = yield select(getIsConnected)
  const isInternetReachable = yield select(getIsInternetReachable)
  const isOfflineLoginEnabled = yield select(getIsOfflineLoginEnabled)
  const isOnlineLoginRequired = yield select(getIsOnlineLoginRequired)

  if (
    (!isOfflineLoginEnabled || isOnlineLoginRequired) &&
    (!isConnected || !isInternetReachable)
  ) {
    yield put(
      createAction('LoginFailed', {
        error: ResponseError.createResponseError(
          0,
          'saga_error_unable_to_connect',
        ),
      }),
    )
    return
  }

  let error
  let status = 0

  const passwordHash = hashPassword(action.password, action.username)

  const realm = yield select(getRealm)
  const session: ISecuritySession = loadSecuritySession(realm)

  const hasSessionExpired = yield call(getHasSessionExpired, session)

  if (hasSessionExpired) {
    session.created = new Date()
    session.passwordHash = undefined
  }

  if (isConnected && isInternetReachable) {
    const apiUri = yield select(getApiUri)
    const apiKey = yield select(getApiKey)
    const getTimeoutInMilliseconds = yield select(
      getApiCallTimeoutInMilliseconds,
    )
    const isApiStubbed = yield select(getIsApiStubbed)

    let response = yield call(
      loginApi,
      passwordHash,
      action.username,
      apiUri,
      apiKey,
      getTimeoutInMilliseconds,
      isApiStubbed,
      action.password,
    )

    status = response.status

    if (status < 200 || status >= 300) {
      // Explicitly handle HTTP codes that are known to be returned from the service
      switch (status) {
        case 401:
          error = 'saga_error_invalid_username_or_password'
          break
        case 423:
          error = 'saga_error_account_locked'
          break
        case 500:
          error = 'saga_error_server_error'
          break
        default:
          if (R.isNil(response.error) || R.isEmpty(response.error)) {
            error = 'saga_error_unspecified_error'
          } else {
            error = response.error
          }
      }
    } else if (!R.isNil(response.error) && !R.isEmpty(response.error)) {
      error = response.error
    }
  } else if (isOfflineLoginEnabled && hasSessionExpired) {
    error = 'saga_error_session_expired'
  } else if (
    !isOnlineLoginRequired &&
    isOfflineLoginEnabled &&
    !hasSessionExpired &&
    !R.isNil(session.passwordHash) &&
    !R.isEmpty(session.passwordHash)
  ) {
    // Validate against stored credentials
    if (passwordHash !== session.passwordHash) {
      error = 'saga_error_invalid_username_or_password'
    }
  } else {
    error = 'saga_error_unable_to_login'
  }

  if (R.isNil(error)) {
    session.created = new Date()
    session.passwordHash = passwordHash
    session.username = action.username
    session.failedPINAttempts = 0

    saveSecuritySession(session, realm)

    yield put(
      createAction('LoginSucceeded', {
        username: action.username,
        isOnlineLoginRequired: !isOfflineLoginEnabled,
      }),
    )
  } else {
    yield put(
      createAction('LoginFailed', {
        error: ResponseError.createResponseError(status, error),
      }),
    )
  }
}
