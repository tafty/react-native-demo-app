import { call, put, select } from 'redux-saga/effects'

import getHasSessionExpired from './getHasSessionExpired'
import { createAction } from '../../actions/createAction'
import { loadSecuritySession, saveSecuritySession } from '../../data/security'
import { ISecuritySession } from '../../models/currentInterfaces'
import ResponseError from '../../models/internal/responseError'
import { getHasEnforcedLoginOnForeground } from '../../selectors/security/getHasEnforcedLoginOnForeground'
import { getRealm } from '../../selectors/realm/getRealm'

export default function* executeAppActive(): Generator<any, void, any> {
  let sessionHasExpired = false
  const realm = yield select(getRealm)
  const session: ISecuritySession = loadSecuritySession(realm)

  const hasSessionExpired = yield call(getHasSessionExpired, session)

  if (hasSessionExpired) {
    session.passwordHash = undefined
    saveSecuritySession(session, realm)
    sessionHasExpired = true
  }

  const hasEnforcedLoginOnForeground = yield select(
    getHasEnforcedLoginOnForeground,
  )

  if (hasEnforcedLoginOnForeground) {
    yield put(createAction('RequireLogin', {}))

    return
  }

  if (sessionHasExpired) {
    yield put(
      createAction('SecuritySessionExpired', {
        error: ResponseError.createResponseError(
          0,
          'saga_error_session_expired',
        ),
      }),
    )
  }
}
