import MockDate from 'mockdate'
import moment from 'moment'

import executeAppActive from '../executeAppActive'

import CurrentModels from '../../../models'
import { getRealm } from '../../../selectors/realm/getRealm'
import { getHasEnforcedLoginOnForeground } from '../../../selectors/security/getHasEnforcedLoginOnForeground'

const { SecuritySession } = CurrentModels

describe('executeAppActive', () => {
  it('should do nothing if session has not expired and should not check for enforced login', () => {
    MockDate.set(1434319925275)
    let isWriteCalled = false
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = 'hash'

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

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getHasEnforcedLoginOnForeground } } },
      { done: true, value: undefined },
    ]

    const generator = executeAppActive()
    expect(generator.next()).toEqual(expected[0])
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
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    expect(generator.next(false)).toEqual(expected[1])
    expect(generator.next(false)).toEqual(expected[2])

    expect(isWriteCalled).toBeFalsy()
    MockDate.reset()
  })

  it('should require login if session has not expired and should check for enforced login', () => {
    MockDate.set(1434319925275)
    let isWriteCalled = false
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = 'hash'

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

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getHasEnforcedLoginOnForeground } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'PUT', combinator: false, payload: { action: { type: 'RequireLogin' }, channel: undefined } } },
      { done: true, value: undefined },
    ]

    const generator = executeAppActive()
    expect(generator.next()).toEqual(expected[0])
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
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    expect(generator.next(false)).toEqual(expected[1])
    expect(generator.next(true)).toEqual(expected[2])
    expect(generator.next()).toEqual(expected[3])

    expect(isWriteCalled).toBeFalsy()
    MockDate.reset()
  })

  it('should require login if session has expired and should check for enforced login', () => {
    MockDate.set(1434319925275)
    let isWriteCalled = false
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = moment().subtract(180, 'minutes').toDate()
    securitySession.passwordHash = 'hash'

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

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getHasEnforcedLoginOnForeground } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'PUT', combinator: false, payload: { action: { type: 'RequireLogin' }, channel: undefined } } },
      { done: true, value: undefined },
    ]

    const generator = executeAppActive()
    expect(generator.next()).toEqual(expected[0])
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
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    expect(generator.next(true)).toEqual(expected[1])
    expect(generator.next(true)).toEqual(expected[2])
    expect(generator.next()).toEqual(expected[3])

    expect(isWriteCalled).toBeTruthy()
    MockDate.reset()
  })

  it('should do nothing if session has not expired and should not enforced login', () => {
    MockDate.set(1434319925275)
    let isWriteCalled = false
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = moment().add(60, 'minutes').toDate()
    securitySession.passwordHash = 'hash'

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

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getHasEnforcedLoginOnForeground } } },
      { done: true, value: undefined },
    ]

    const generator = executeAppActive()
    expect(generator.next()).toEqual(expected[0])
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
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    expect(generator.next(false)).toEqual(expected[1])
    expect(generator.next(false)).toEqual(expected[2])

    expect(isWriteCalled).toBeFalsy()
    MockDate.reset()
  })

  it('should expire session if session has expired and should not enforced login', () => {
    MockDate.set(1434319925275)
    let isWriteCalled = false
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = moment().subtract(180, 'minutes').toDate()
    securitySession.passwordHash = 'hash'

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

    // prettier-ignore
    const expected = [
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getRealm } } },
      { done: false, value: { '@@redux-saga/IO': true, type: 'SELECT', combinator: false, payload: { args: [], selector: getHasEnforcedLoginOnForeground } } },
      { done: true, value: undefined },
    ]

    const generator = executeAppActive()
    expect(generator.next()).toEqual(expected[0])
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
    expect(result.value.payload.args[0].passwordHash).toEqual(
      securitySession.passwordHash,
    )
    expect(generator.next(true)).toEqual(expected[1])
    const result2: any = generator.next(false)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual('SecuritySessionExpired')
    expect(result2.value.payload.action.error.status).toEqual(0)
    expect(result2.value.payload.action.error.message).toEqual(
      'saga_error_session_expired',
    )
    expect(generator.next()).toEqual(expected[2])

    expect(isWriteCalled).toBeTruthy()
    MockDate.reset()
  })
})
