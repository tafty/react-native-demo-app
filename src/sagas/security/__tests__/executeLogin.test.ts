import MockDate from 'mockdate'
import moment from 'moment'
import { testSaga } from 'redux-saga-test-plan'

import executeLogin from '../executeLogin'

import { login } from '../../../api/security/login'
import CurrentModels from '../../../models'
import ResponseError from '../../../models/internal/responseError'
import { getApiKey } from '../../../selectors/configuration/getApiKey'
import { getApiUri } from '../../../selectors/configuration/getApiUri'
import { getApiCallTimeoutInMilliseconds } from '../../../selectors/configuration/getApiCallTimeoutInMilliseconds'
import { getIsApiStubbed } from '../../../selectors/configuration/getIsApiStubbed'
import { getIsConnected } from '../../../selectors/networkConnection/getIsConnected'
import { getIsInternetReachable } from '../../../selectors/networkConnection/getIsInternetReachable'
import { getIsOfflineLoginEnabled } from '../../../selectors/security/getIsOfflineLoginEnabled'
import { getIsOnlineLoginRequired } from '../../../selectors/security/getIsOnlineLoginRequired'
import { getRealm } from '../../../selectors/realm/getRealm'
import { createAction } from '../../../actions'

const { SecuritySession } = CurrentModels

const passHashed = '[object Object]'

describe('executeLogin', () => {
  it('should fail login if username is an empty string', () => {
    const username = ''
    const password = 'pass'

    const action = createAction('LoginStarted', { username, password })
    const saga = testSaga(executeLogin, action)
    saga
      .next()
      .put({
        type: 'LoginFailed',
        error: ResponseError.createResponseError(
          0,
          'saga_error_missing_username_or_password',
        ),
      })
      .next()
      .isDone()
  })

  it('should fail login if password is an empty string', () => {
    const username = 'user'
    const password = ''
    const action = createAction('LoginStarted', { username, password })

    const saga = testSaga(executeLogin, action)
    saga
      .next()
      .put({
        type: 'LoginFailed',
        error: ResponseError.createResponseError(
          0,
          'saga_error_missing_username_or_password',
        ),
      })
      .next()
      .isDone()
  })

  it('should fail login if internet is unreachable and online login is required', () => {
    const username = 'user'
    const password = 'pass'
    const action = createAction('LoginStarted', { username, password })

    const saga = testSaga(executeLogin, action)
    saga
      .next()
      .select(getIsConnected)
      .next(true)
      .select(getIsInternetReachable)
      .next(false)
      .select(getIsOfflineLoginEnabled)
      .next(true)
      .select(getIsOnlineLoginRequired)
      .next(true)
      .put({
        type: 'LoginFailed',
        error: ResponseError.createResponseError(
          0,
          'saga_error_unable_to_connect',
        ),
      })
      .next()
      .isDone()
  })

  it('should fail login if internet is unreachable and offline login is disabled', () => {
    const username = 'user'
    const password = 'pass'
    const action = createAction('LoginStarted', { username, password })

    const saga = testSaga(executeLogin, action)
    saga
      .next()
      .select(getIsConnected)
      .next(true)
      .select(getIsInternetReachable)
      .next(false)
      .select(getIsOfflineLoginEnabled)
      .next(false)
      .select(getIsOnlineLoginRequired)
      .next(false)
      .put({
        type: 'LoginFailed',
        error: ResponseError.createResponseError(
          0,
          'saga_error_unable_to_connect',
        ),
      })
      .next()
      .isDone()
  })

  it('should fail login if network is disconnected and online login is required', () => {
    const username = 'user'
    const password = 'pass'
    const action = createAction('LoginStarted', { username, password })

    const saga = testSaga(executeLogin, action)
    saga
      .next()
      .select(getIsConnected)
      .next(false)
      .select(getIsInternetReachable)
      .next(false)
      .select(getIsOfflineLoginEnabled)
      .next(true)
      .select(getIsOnlineLoginRequired)
      .next(true)
      .put({
        type: 'LoginFailed',
        error: ResponseError.createResponseError(
          0,
          'saga_error_unable_to_connect',
        ),
      })
      .next()
      .isDone()
  })

  it('should fail login if network is disconnected and offline login is disabled', () => {
    const username = 'user'
    const password = 'pass'
    const action = createAction('LoginStarted', { username, password })

    const saga = testSaga(executeLogin, action)
    saga
      .next()
      .select(getIsConnected)
      .next(false)
      .select(getIsInternetReachable)
      .next(false)
      .select(getIsOfflineLoginEnabled)
      .next(false)
      .select(getIsOnlineLoginRequired)
      .next(false)
      .put({
        type: 'LoginFailed',
        error: ResponseError.createResponseError(
          0,
          'saga_error_unable_to_connect',
        ),
      })
      .next()
      .isDone()
  })

  it('should pass login if online validation passes', () => {
    const username = 'user'
    const password = 'pass'
    const isOfflineLoginEnabled = false
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = 'hash'
    securitySession.username = username
    const apiUri = 'http://localhost'
    const apiKey = 'key'
    const getTimeoutInMilliseconds = () => {}
    const response = { status: 200, data: { userId: 1 } }

    let isWriteCalled = false
    const realm = {
      objects: () => {
        return {
          length: 1,
          sorted: () => {
            return [securitySession]
          },
        }
      },
      write: () => {
        isWriteCalled = true
      },
    }

    const action = createAction('LoginStarted', { username, password })

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsConnected } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsInternetReachable } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOfflineLoginEnabled } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOnlineLoginRequired } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiUri } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiKey } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiCallTimeoutInMilliseconds } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsApiStubbed } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'CALL', combinator: false, payload: { args: [passHashed, username, apiUri, apiKey, getTimeoutInMilliseconds, false, password ], context: null, fn: login } } },
      { done: true, value: undefined },
    ]

    const generator = executeLogin(action)
    expect(generator.next()).toEqual(expected[0])
    expect(generator.next(true)).toEqual(expected[1])
    expect(generator.next(true)).toEqual(expected[2])
    expect(generator.next(isOfflineLoginEnabled)).toEqual(expected[3])
    expect(generator.next(true)).toEqual(expected[4])
    const result: any = generator.next(realm)
    expect(result.done).toBeFalsy()
    expect(result.value.type).toEqual('CALL')
    expect(result.value.payload.args).toHaveLength(1)
    expect(result.value.payload.args[0].securitySessionId).toEqual(
      securitySession.securitySessionId,
    )
    expect(result.value.payload.args[0].created).toEqual(
      securitySession.created,
    )
    expect(result.value.payload.args[0].username).toEqual(
      securitySession.username,
    )
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    expect(generator.next(false)).toEqual(expected[5])
    expect(generator.next(apiUri)).toEqual(expected[6])
    expect(generator.next(apiKey)).toEqual(expected[7])
    expect(generator.next(getTimeoutInMilliseconds)).toEqual(expected[8])
    expect(generator.next(false)).toEqual(expected[9])
    const result2: any = generator.next(response)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual('LoginSucceeded')
    expect(result2.value.payload.action.username).toEqual(username)
    expect(result2.value.payload.action.isOnlineLoginRequired).toEqual(
      !isOfflineLoginEnabled,
    )
    expect(generator.next()).toEqual(expected[10])

    expect(isWriteCalled).toBeTruthy()
  })

  it('should fail login if a 401 status is returned', () => {
    const username = 'user'
    const password = 'pass'
    const isOfflineLoginEnabled = false
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = 'hash'
    securitySession.username = username
    const apiUri = 'http://localhost'
    const apiKey = 'key'
    const getTimeoutInMilliseconds = () => {}
    const response = { status: 401, data: {} }

    let isWriteCalled = false
    const realm = {
      objects: () => {
        return {
          length: 1,
          sorted: () => {
            return [securitySession]
          },
        }
      },
      write: () => {
        isWriteCalled = true
      },
    }

    const action = createAction('LoginStarted', { username, password })

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsConnected } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsInternetReachable } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOfflineLoginEnabled } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOnlineLoginRequired } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiUri } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiKey } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiCallTimeoutInMilliseconds } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsApiStubbed } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'CALL', combinator: false, payload: { args: [passHashed, username, apiUri, apiKey, getTimeoutInMilliseconds, false, password ], context: null, fn: login } } },
      { done: true, value: undefined },
    ]

    const generator = executeLogin(action)
    expect(generator.next()).toEqual(expected[0])
    expect(generator.next(true)).toEqual(expected[1])
    expect(generator.next(true)).toEqual(expected[2])
    expect(generator.next(isOfflineLoginEnabled)).toEqual(expected[3])
    expect(generator.next(false)).toEqual(expected[4])
    const result: any = generator.next(realm)
    expect(result.done).toBeFalsy()
    expect(result.value.type).toEqual('CALL')
    expect(result.value.payload.args).toHaveLength(1)
    expect(result.value.payload.args[0].securitySessionId).toEqual(
      securitySession.securitySessionId,
    )
    expect(result.value.payload.args[0].created).toEqual(
      securitySession.created,
    )
    expect(result.value.payload.args[0].username).toEqual(
      securitySession.username,
    )
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    expect(generator.next(false)).toEqual(expected[5])
    expect(generator.next(apiUri)).toEqual(expected[6])
    expect(generator.next(apiKey)).toEqual(expected[7])
    expect(generator.next(getTimeoutInMilliseconds)).toEqual(expected[8])
    expect(generator.next(false)).toEqual(expected[9])
    const result2: any = generator.next(response)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual('LoginFailed')
    expect(result2.value.payload.action.error.status).toEqual(401)
    expect(result2.value.payload.action.error.message).toEqual(
      'saga_error_invalid_username_or_password',
    )
    expect(generator.next()).toEqual(expected[10])

    expect(isWriteCalled).toBeFalsy()
  })

  it('should fail login if a 423 status is returned', () => {
    const username = 'user'
    const password = 'pass'
    const isOfflineLoginEnabled = false
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = 'hash'
    securitySession.username = username
    const apiUri = 'http://localhost'
    const apiKey = 'key'
    const getTimeoutInMilliseconds = () => {}
    const response = { status: 423, data: {} }

    let isWriteCalled = false
    const realm = {
      objects: () => {
        return {
          length: 1,
          sorted: () => {
            return [securitySession]
          },
        }
      },
      write: () => {
        isWriteCalled = true
      },
    }

    const action = createAction('LoginStarted', { username, password })

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsConnected } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsInternetReachable } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOfflineLoginEnabled } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOnlineLoginRequired } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiUri } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiKey } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiCallTimeoutInMilliseconds } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsApiStubbed } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'CALL', combinator: false, payload: { args: [passHashed, username, apiUri, apiKey, getTimeoutInMilliseconds, false, password ], context: null, fn: login } } },
      { done: true, value: undefined },
    ]

    const generator = executeLogin(action)
    expect(generator.next()).toEqual(expected[0])
    expect(generator.next(true)).toEqual(expected[1])
    expect(generator.next(true)).toEqual(expected[2])
    expect(generator.next(isOfflineLoginEnabled)).toEqual(expected[3])
    expect(generator.next(false)).toEqual(expected[4])
    const result: any = generator.next(realm)
    expect(result.done).toBeFalsy()
    expect(result.value.type).toEqual('CALL')
    expect(result.value.payload.args).toHaveLength(1)
    expect(result.value.payload.args[0].securitySessionId).toEqual(
      securitySession.securitySessionId,
    )
    expect(result.value.payload.args[0].created).toEqual(
      securitySession.created,
    )
    expect(result.value.payload.args[0].username).toEqual(
      securitySession.username,
    )
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    expect(generator.next(false)).toEqual(expected[5])
    expect(generator.next(apiUri)).toEqual(expected[6])
    expect(generator.next(apiKey)).toEqual(expected[7])
    expect(generator.next(getTimeoutInMilliseconds)).toEqual(expected[8])
    expect(generator.next(false)).toEqual(expected[9])
    const result2: any = generator.next(response)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual('LoginFailed')
    expect(result2.value.payload.action.error.status).toEqual(423)
    expect(result2.value.payload.action.error.message).toEqual(
      'saga_error_account_locked',
    )
    expect(generator.next()).toEqual(expected[10])

    expect(isWriteCalled).toBeFalsy()
  })

  it('should fail login if a 500 status is returned', () => {
    const username = 'user'
    const password = 'pass'
    const isOfflineLoginEnabled = false
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = 'hash'
    securitySession.username = username
    const apiUri = 'http://localhost'
    const apiKey = 'key'
    const getTimeoutInMilliseconds = () => {}
    const response = { status: 500, data: {} }

    let isWriteCalled = false
    const realm = {
      objects: () => {
        return {
          length: 1,
          sorted: () => {
            return [securitySession]
          },
        }
      },
      write: () => {
        isWriteCalled = true
      },
    }

    const action = createAction('LoginStarted', { username, password })

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsConnected } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsInternetReachable } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOfflineLoginEnabled } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOnlineLoginRequired } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiUri } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiKey } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiCallTimeoutInMilliseconds } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsApiStubbed } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'CALL', combinator: false, payload: { args: [passHashed, username, apiUri, apiKey, getTimeoutInMilliseconds, false, password ], context: null, fn: login } } },
      { done: true, value: undefined },
    ]

    const generator = executeLogin(action)
    expect(generator.next()).toEqual(expected[0])
    expect(generator.next(true)).toEqual(expected[1])
    expect(generator.next(true)).toEqual(expected[2])
    expect(generator.next(isOfflineLoginEnabled)).toEqual(expected[3])
    expect(generator.next(false)).toEqual(expected[4])
    const result: any = generator.next(realm)
    expect(result.done).toBeFalsy()
    expect(result.value.type).toEqual('CALL')
    expect(result.value.payload.args).toHaveLength(1)
    expect(result.value.payload.args[0].securitySessionId).toEqual(
      securitySession.securitySessionId,
    )
    expect(result.value.payload.args[0].created).toEqual(
      securitySession.created,
    )
    expect(result.value.payload.args[0].username).toEqual(
      securitySession.username,
    )
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    expect(generator.next(false)).toEqual(expected[5])
    expect(generator.next(apiUri)).toEqual(expected[6])
    expect(generator.next(apiKey)).toEqual(expected[7])
    expect(generator.next(getTimeoutInMilliseconds)).toEqual(expected[8])
    expect(generator.next(false)).toEqual(expected[9])
    const result2: any = generator.next(response)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual('LoginFailed')
    expect(result2.value.payload.action.error.status).toEqual(500)
    expect(result2.value.payload.action.error.message).toEqual(
      'saga_error_server_error',
    )
    expect(generator.next()).toEqual(expected[10])

    expect(isWriteCalled).toBeFalsy()
  })

  it('should fail login if an unhandled status is returned', () => {
    const username = 'user'
    const password = 'pass'
    const isOfflineLoginEnabled = false
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = 'hash'
    securitySession.username = username
    const apiUri = 'http://localhost'
    const apiKey = 'key'
    const getTimeoutInMilliseconds = () => {}
    const response = { status: 404, data: {} }

    let isWriteCalled = false
    const realm = {
      objects: () => {
        return {
          length: 1,
          sorted: () => {
            return [securitySession]
          },
        }
      },
      write: () => {
        isWriteCalled = true
      },
    }

    const action = createAction('LoginStarted', { username, password })

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsConnected } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsInternetReachable } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOfflineLoginEnabled } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOnlineLoginRequired } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiUri } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiKey } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiCallTimeoutInMilliseconds } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsApiStubbed } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'CALL', combinator: false, payload: { args: [passHashed, username, apiUri, apiKey, getTimeoutInMilliseconds, false, password ], context: null, fn: login } } },
      { done: true, value: undefined },
    ]

    const generator = executeLogin(action)
    expect(generator.next()).toEqual(expected[0])
    expect(generator.next(true)).toEqual(expected[1])
    expect(generator.next(true)).toEqual(expected[2])
    expect(generator.next(isOfflineLoginEnabled)).toEqual(expected[3])
    expect(generator.next(false)).toEqual(expected[4])
    const result: any = generator.next(realm)
    expect(result.done).toBeFalsy()
    expect(result.value.type).toEqual('CALL')
    expect(result.value.payload.args).toHaveLength(1)
    expect(result.value.payload.args[0].securitySessionId).toEqual(
      securitySession.securitySessionId,
    )
    expect(result.value.payload.args[0].created).toEqual(
      securitySession.created,
    )
    expect(result.value.payload.args[0].username).toEqual(
      securitySession.username,
    )
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    expect(generator.next(false)).toEqual(expected[5])
    expect(generator.next(apiUri)).toEqual(expected[6])
    expect(generator.next(apiKey)).toEqual(expected[7])
    expect(generator.next(getTimeoutInMilliseconds)).toEqual(expected[8])
    expect(generator.next(false)).toEqual(expected[9])
    const result2: any = generator.next(response)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual('LoginFailed')
    expect(result2.value.payload.action.error.status).toEqual(404)
    expect(result2.value.payload.action.error.message).toEqual(
      'saga_error_unspecified_error',
    )
    expect(generator.next()).toEqual(expected[10])

    expect(isWriteCalled).toBeFalsy()
  })

  it('should fail login if an unhandled status is returned with an error against the response', () => {
    const username = 'user'
    const password = 'pass'
    const isOfflineLoginEnabled = false
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = 'hash'
    securitySession.username = username
    const apiUri = 'http://localhost'
    const apiKey = 'key'
    const getTimeoutInMilliseconds = () => {}
    const response = { status: 404, error: 'bad error' }

    let isWriteCalled = false
    const realm = {
      objects: () => {
        return {
          length: 1,
          sorted: () => {
            return [securitySession]
          },
        }
      },
      write: () => {
        isWriteCalled = true
      },
    }

    const action = createAction('LoginStarted', { username, password })

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsConnected } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsInternetReachable } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOfflineLoginEnabled } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOnlineLoginRequired } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiUri } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiKey } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiCallTimeoutInMilliseconds } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsApiStubbed } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'CALL', combinator: false, payload: { args: [passHashed, username, apiUri, apiKey, getTimeoutInMilliseconds, false, password ], context: null, fn: login } } },
      { done: true, value: undefined },
    ]

    const generator = executeLogin(action)
    expect(generator.next()).toEqual(expected[0])
    expect(generator.next(true)).toEqual(expected[1])
    expect(generator.next(true)).toEqual(expected[2])
    expect(generator.next(isOfflineLoginEnabled)).toEqual(expected[3])
    expect(generator.next(false)).toEqual(expected[4])
    const result: any = generator.next(realm)
    expect(result.done).toBeFalsy()
    expect(result.value.type).toEqual('CALL')
    expect(result.value.payload.args).toHaveLength(1)
    expect(result.value.payload.args[0].securitySessionId).toEqual(
      securitySession.securitySessionId,
    )
    expect(result.value.payload.args[0].created).toEqual(
      securitySession.created,
    )
    expect(result.value.payload.args[0].username).toEqual(
      securitySession.username,
    )
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    expect(generator.next(false)).toEqual(expected[5])
    expect(generator.next(apiUri)).toEqual(expected[6])
    expect(generator.next(apiKey)).toEqual(expected[7])
    expect(generator.next(getTimeoutInMilliseconds)).toEqual(expected[8])
    expect(generator.next(false)).toEqual(expected[9])
    const result2: any = generator.next(response)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual('LoginFailed')
    expect(result2.value.payload.action.error.status).toEqual(404)
    expect(result2.value.payload.action.error.message).toEqual('bad error')
    expect(generator.next()).toEqual(expected[10])

    expect(isWriteCalled).toBeFalsy()
  })

  it('should fail login if an error is returned as part of the response', () => {
    const username = 'user'
    const password = 'pass'
    const isOfflineLoginEnabled = false
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = 'hash'
    securitySession.username = username
    const apiUri = 'http://localhost'
    const apiKey = 'key'
    const getTimeoutInMilliseconds = () => {}
    const response = { status: 200, error: 'weird error' }

    let isWriteCalled = false
    const realm = {
      objects: () => {
        return {
          length: 1,
          sorted: () => {
            return [securitySession]
          },
        }
      },
      write: () => {
        isWriteCalled = true
      },
    }

    const action = createAction('LoginStarted', { username, password })

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsConnected } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsInternetReachable } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOfflineLoginEnabled } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOnlineLoginRequired } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiUri } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiKey } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getApiCallTimeoutInMilliseconds } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsApiStubbed } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'CALL', combinator: false, payload: { args: [passHashed, username, apiUri, apiKey, getTimeoutInMilliseconds, false, password ], context: null, fn: login } } },
      { done: true, value: undefined },
    ]

    const generator = executeLogin(action)
    expect(generator.next()).toEqual(expected[0])
    expect(generator.next(true)).toEqual(expected[1])
    expect(generator.next(true)).toEqual(expected[2])
    expect(generator.next(isOfflineLoginEnabled)).toEqual(expected[3])
    expect(generator.next(false)).toEqual(expected[4])
    const result: any = generator.next(realm)
    expect(result.done).toBeFalsy()
    expect(result.value.type).toEqual('CALL')
    expect(result.value.payload.args).toHaveLength(1)
    expect(result.value.payload.args[0].securitySessionId).toEqual(
      securitySession.securitySessionId,
    )
    expect(result.value.payload.args[0].created).toEqual(
      securitySession.created,
    )
    expect(result.value.payload.args[0].username).toEqual(
      securitySession.username,
    )
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    expect(generator.next(false)).toEqual(expected[5])
    expect(generator.next(apiUri)).toEqual(expected[6])
    expect(generator.next(apiKey)).toEqual(expected[7])
    expect(generator.next(getTimeoutInMilliseconds)).toEqual(expected[8])
    expect(generator.next(false)).toEqual(expected[9])
    const result2: any = generator.next(response)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual('LoginFailed')
    expect(result2.value.payload.action.error.status).toEqual(200)
    expect(result2.value.payload.action.error.message).toEqual('weird error')
    expect(generator.next()).toEqual(expected[10])

    expect(isWriteCalled).toBeFalsy()
  })

  it('should fail login with no network and offline login is enabled but the session has expired', () => {
    MockDate.set(1434319925275)
    const username = 'user'
    const password = 'pass'
    const isOfflineLoginEnabled = true
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = moment().subtract(180, 'minutes').toDate()
    securitySession.passwordHash = 'hash'
    securitySession.username = username

    let isWriteCalled = false
    const realm = {
      objects: () => {
        return {
          length: 1,
          sorted: () => {
            return [securitySession]
          },
        }
      },
      write: () => {
        isWriteCalled = true
      },
    }

    const action = createAction('LoginStarted', { username, password })

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsConnected } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsInternetReachable } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOfflineLoginEnabled } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOnlineLoginRequired } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: true, value: undefined },
    ]

    const generator = executeLogin(action)
    expect(generator.next()).toEqual(expected[0])
    expect(generator.next(false)).toEqual(expected[1])
    expect(generator.next(false)).toEqual(expected[2])
    expect(generator.next(isOfflineLoginEnabled)).toEqual(expected[3])
    expect(generator.next(false)).toEqual(expected[4])
    const result: any = generator.next(realm)
    expect(result.done).toBeFalsy()
    expect(result.value.type).toEqual('CALL')
    expect(result.value.payload.args).toHaveLength(1)
    expect(result.value.payload.args[0].securitySessionId).toEqual(
      securitySession.securitySessionId,
    )
    expect(result.value.payload.args[0].created).toEqual(
      securitySession.created,
    )
    expect(result.value.payload.args[0].username).toEqual(
      securitySession.username,
    )
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    const result2: any = generator.next(true)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual('LoginFailed')
    expect(result2.value.payload.action.error.status).toEqual(0)
    expect(result2.value.payload.action.error.message).toEqual(
      'saga_error_session_expired',
    )
    expect(generator.next()).toEqual(expected[5])

    expect(isWriteCalled).toBeFalsy()
    MockDate.reset()
  })

  it('should fail login with no network, offline login is enabled, the session has not expired, online login is not required but the password is incorrect', () => {
    MockDate.set(1434319925275)
    const username = 'user'
    const password = 'pass'
    const isOfflineLoginEnabled = true
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = 'hash'
    securitySession.username = username

    let isWriteCalled = false
    const realm = {
      objects: () => {
        return {
          length: 1,
          sorted: () => {
            return [securitySession]
          },
        }
      },
      write: () => {
        isWriteCalled = true
      },
    }

    const action = createAction('LoginStarted', { username, password })

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsConnected } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsInternetReachable } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOfflineLoginEnabled } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOnlineLoginRequired } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: true, value: undefined },
    ]

    const generator = executeLogin(action)
    expect(generator.next()).toEqual(expected[0])
    expect(generator.next(false)).toEqual(expected[1])
    expect(generator.next(false)).toEqual(expected[2])
    expect(generator.next(isOfflineLoginEnabled)).toEqual(expected[3])
    expect(generator.next(false)).toEqual(expected[4])
    const result: any = generator.next(realm)
    expect(result.done).toBeFalsy()
    expect(result.value.type).toEqual('CALL')
    expect(result.value.payload.args).toHaveLength(1)
    expect(result.value.payload.args[0].securitySessionId).toEqual(
      securitySession.securitySessionId,
    )
    expect(result.value.payload.args[0].created).toEqual(
      securitySession.created,
    )
    expect(result.value.payload.args[0].username).toEqual(
      securitySession.username,
    )
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    const result2: any = generator.next(false)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual('LoginFailed')
    expect(result2.value.payload.action.error.status).toEqual(0)
    expect(result2.value.payload.action.error.message).toEqual(
      'saga_error_invalid_username_or_password',
    )
    expect(generator.next()).toEqual(expected[5])

    expect(isWriteCalled).toBeFalsy()
    MockDate.reset()
  })

  it('should pass login with no network, offline login is enabled, the session has not expired, online login is not required and the password is correct', () => {
    MockDate.set(1434319925275)
    const username = 'user'
    const password = 'pass'
    const isOfflineLoginEnabled = true
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = passHashed
    securitySession.username = username

    let isWriteCalled = false
    const realm = {
      objects: () => {
        return {
          length: 1,
          sorted: () => {
            return [securitySession]
          },
        }
      },
      write: () => {
        isWriteCalled = true
      },
    }

    const action = createAction('LoginStarted', { username, password })

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsConnected } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsInternetReachable } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOfflineLoginEnabled } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOnlineLoginRequired } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: true, value: undefined },
    ]

    const generator = executeLogin(action)
    expect(generator.next()).toEqual(expected[0])
    expect(generator.next(false)).toEqual(expected[1])
    expect(generator.next(false)).toEqual(expected[2])
    expect(generator.next(isOfflineLoginEnabled)).toEqual(expected[3])
    expect(generator.next(false)).toEqual(expected[4])
    const result = generator.next(realm)
    expect(result.done).toBeFalsy()
    expect(result.value.type).toEqual('CALL')
    expect(result.value.payload.args).toHaveLength(1)
    expect(result.value.payload.args[0].securitySessionId).toEqual(
      securitySession.securitySessionId,
    )
    expect(result.value.payload.args[0].created).toEqual(
      securitySession.created,
    )
    expect(result.value.payload.args[0].username).toEqual(
      securitySession.username,
    )
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    const result2 = generator.next(false)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual('LoginSucceeded')
    expect(result2.value.payload.action.username).toEqual(username)
    expect(result2.value.payload.action.isOnlineLoginRequired).toEqual(
      !isOfflineLoginEnabled,
    )
    expect(generator.next()).toEqual(expected[5])

    expect(isWriteCalled).toBeTruthy()
    MockDate.reset()
  })

  it('should fail login with no network, offline login is enabled but there is no password hash stored', () => {
    MockDate.set(1434319925275)
    const username = 'user'
    const password = 'pass'
    const isOfflineLoginEnabled = true
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = undefined
    securitySession.username = username

    let isWriteCalled = false
    const realm = {
      objects: () => {
        return {
          length: 1,
          sorted: () => {
            return [securitySession]
          },
        }
      },
      write: () => {
        isWriteCalled = true
      },
    }

    const action = createAction('LoginStarted', { username, password })

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsConnected } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsInternetReachable } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOfflineLoginEnabled } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getIsOnlineLoginRequired } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: true, value: undefined },
    ]

    const generator = executeLogin(action)
    expect(generator.next()).toEqual(expected[0])
    expect(generator.next(false)).toEqual(expected[1])
    expect(generator.next(false)).toEqual(expected[2])
    expect(generator.next(isOfflineLoginEnabled)).toEqual(expected[3])
    expect(generator.next(false)).toEqual(expected[4])
    const result: any = generator.next(realm)
    expect(result.done).toBeFalsy()
    expect(result.value.type).toEqual('CALL')
    expect(result.value.payload.args).toHaveLength(1)
    expect(result.value.payload.args[0].securitySessionId).toEqual(
      securitySession.securitySessionId,
    )
    expect(result.value.payload.args[0].created).toEqual(
      securitySession.created,
    )
    expect(result.value.payload.args[0].username).toEqual(
      securitySession.username,
    )
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    const result2: any = generator.next(false)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual('LoginFailed')
    expect(result2.value.payload.action.error.status).toEqual(0)
    expect(result2.value.payload.action.error.message).toEqual(
      'saga_error_unable_to_login',
    )
    expect(generator.next()).toEqual(expected[5])

    expect(isWriteCalled).toBeFalsy()
    MockDate.reset()
  })
})
