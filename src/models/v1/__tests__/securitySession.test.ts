import MockDate from 'mockdate'

import SecuritySession from '../securitySession'

const testDate = new Date('2020-02-23T13:52:00.000Z')

describe('currentSchema', () => {
  beforeAll(() => {
    MockDate.set(testDate)
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should set correct default values', () => {
    const session = new SecuritySession()

    expect(session.created).toEqual(testDate)
    expect(session.failedPINAttempts).toEqual(0)
    expect(session.securitySessionId).toEqual('')
  })

  it('should create a Security Session from a Realm object', () => {
    const securitySessionId = 'abcd'
    const username = 'bob'
    const passwordHash = '1234abcd'
    const created = new Date()
    const failedPINAttempts = 1

    const realmObject = {
      securitySessionId,
      username,
      passwordHash,
      created,
      failedPINAttempts,
    }

    const session = SecuritySession.fromRealmObject(realmObject)

    expect(session.securitySessionId).toEqual(securitySessionId)
    expect(session.username).toEqual(username)
    expect(session.passwordHash).toEqual(passwordHash)
    expect(session.created).toEqual(created)
    expect(session.failedPINAttempts).toEqual(failedPINAttempts)
  })
})
