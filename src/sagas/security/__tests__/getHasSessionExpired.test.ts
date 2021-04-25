import MockDate from 'mockdate'
import moment from 'moment'
import { testSaga } from 'redux-saga-test-plan'

import getHasSessionExpired from '../getHasSessionExpired'

import CurrentModels from '../../../models'
import { getSessionTimeOutInMinutes } from '../../../selectors/configuration/getSessionTimeOutInMinutes'

const { SecuritySession } = CurrentModels

describe('getHasSessionExpired', () => {
  it('should return false if the stored password is undefined', () => {
    MockDate.set(1434319925275)

    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = undefined

    const sessionTimeOutInMinutes = 120

    const saga = testSaga(getHasSessionExpired, securitySession)
    saga
      .next()
      .select(getSessionTimeOutInMinutes)
      .next(sessionTimeOutInMinutes)
      .isDone()

    MockDate.reset()
  })

  it('should return false if the stored password is empty', () => {
    MockDate.set(1434319925275)

    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = ''

    const sessionTimeOutInMinutes = 120

    const saga = testSaga(getHasSessionExpired, securitySession)
    saga
      .next()
      .select(getSessionTimeOutInMinutes)
      .next(sessionTimeOutInMinutes)
      .isDone()

    MockDate.reset()
  })

  it('should return false if the session timeout is zero', () => {
    MockDate.set(1434319925275)

    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = 'hash'

    const sessionTimeOutInMinutes = 0

    const saga = testSaga(getHasSessionExpired, securitySession)
    saga
      .next()
      .select(getSessionTimeOutInMinutes)
      .next(sessionTimeOutInMinutes)
      .isDone()

    MockDate.reset()
  })

  it('should return false if the session has not timed out', () => {
    MockDate.set(1434319925275)

    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = new Date()
    securitySession.passwordHash = 'hash'

    const sessionTimeOutInMinutes = 120

    const saga = testSaga(getHasSessionExpired, securitySession)
    saga
      .next()
      .select(getSessionTimeOutInMinutes)
      .next(sessionTimeOutInMinutes)
      .isDone()

    MockDate.reset()
  })

  it('should return true if the session has timed out', () => {
    MockDate.set(1434319925275)

    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'
    securitySession.created = moment().subtract(180, 'minutes').toDate()
    securitySession.passwordHash = 'hash'

    const sessionTimeOutInMinutes = 120

    const saga = testSaga(getHasSessionExpired, securitySession)
    saga
      .next()
      .select(getSessionTimeOutInMinutes)
      .next(sessionTimeOutInMinutes)
      .isDone()

    MockDate.reset()
  })
})
