import MockDate from 'mockdate'
import moment from 'moment'

import executeLoadSession from '../executeLoadSession'

import CurrentModels from '../../../models'
import { getRealm } from '../../../selectors/realm/getRealm'

const { SecuritySession } = CurrentModels

describe('executeLoadSession', () => {
  it('should return an empty username if empty session is found', () => {
    MockDate.set(1434319925275)
    let isWriteCalled = false
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()

    const realm = {
      objects: () => {
        return {
          length: 0,
          sorted: () => {
            return []
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
      { done: true, value: undefined },
    ]

    const generator = executeLoadSession()
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
    const result2: any = generator.next(false)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual(
      'SecuritySessionLoadCompleted',
    )
    expect(result2.value.payload.action.username).toBeUndefined()
    expect(generator.next()).toEqual(expected[1])

    expect(isWriteCalled).toBeFalsy()
    MockDate.reset()
  })

  it('should return the username if a session has not expired', () => {
    MockDate.set(1434319925275)
    let isWriteCalled = false
    const username = 'bob'
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = 'hash'
    securitySession.username = username

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
      { done: true, value: undefined },
    ]

    const generator = executeLoadSession()
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
    const result2: any = generator.next(false)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual(
      'SecuritySessionLoadCompleted',
    )
    expect(result2.value.payload.action.username).toEqual(username)
    expect(generator.next()).toEqual(expected[1])

    expect(isWriteCalled).toBeFalsy()
    MockDate.reset()
  })

  it('should expire session if session has expired', () => {
    MockDate.set(1434319925275)
    let isWriteCalled = false
    const username = 'bob'
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = moment().subtract(180, 'minutes').toDate()
    securitySession.passwordHash = 'hash'
    securitySession.username = username

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
      { done: true, value: undefined },
    ]

    const generator = executeLoadSession()
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
    const result2: any = generator.next(true)
    expect(result2.done).toBeFalsy()
    expect(result2.value.type).toEqual('PUT')
    expect(result2.value.payload.action.type).toEqual('SecuritySessionExpired')
    expect(result2.value.payload.action.error.status).toEqual(0)
    expect(result2.value.payload.action.error.message).toEqual(
      'saga_error_session_expired',
    )
    expect(generator.next()).toEqual(expected[1])

    expect(isWriteCalled).toBeTruthy()
    MockDate.reset()
  })
})
