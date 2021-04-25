import { fork } from 'redux-saga/effects'
import { testSaga } from 'redux-saga-test-plan'

import {
  watchForAppActive,
  watchForAppInactive,
  watchForDatabaseOpened,
  watchForLoginStarted,
  watchForLogOutStarted,
  watchForSecurityActions,
} from '../security'
import executeAppActive from '../security/executeAppActive'
import executeAppInactive from '../security/executeAppInactive'
import executeLoadSession from '../security/executeLoadSession'
import executeLogin from '../security/executeLogin'
import executeLogOut from '../security/executeLogOut'

import { ActionType } from '../../actions/actionType'

describe('Security actions', () => {
  it('should watch for security actions', () => {
    const saga = testSaga(watchForSecurityActions)
    saga
      .next()
      .all([
        fork(watchForAppActive),
        fork(watchForAppInactive),
        fork(watchForDatabaseOpened),
        fork(watchForLoginStarted),
        fork(watchForLogOutStarted),
      ])
      .next()
      .isDone()
  })

  describe('watchForAppActive', () => {
    it('should respond to app activation', () => {
      const pattern: ActionType = 'AppActive'
      const saga = testSaga(watchForAppActive)
      saga.next().takeLatest(pattern, executeAppActive).next().isDone()
    })
  })

  describe('watchForAppInactive', () => {
    it('should respond to app deactivation', () => {
      const pattern: ActionType = 'AppInactive'
      const saga = testSaga(watchForAppInactive)
      saga.next().takeLatest(pattern, executeAppInactive).next().isDone()
    })
  })

  describe('watchForDatabaseOpened', () => {
    it('should respond to database opening', () => {
      const pattern: ActionType = 'DatabaseOpened'
      const saga = testSaga(watchForDatabaseOpened)
      saga.next().takeLatest(pattern, executeLoadSession).next().isDone()
    })
  })

  describe('watchForLoginStarted', () => {
    it('should respond to login start', () => {
      const pattern: ActionType = 'LoginStarted'
      const saga = testSaga(watchForLoginStarted)
      saga.next().takeLatest(pattern, executeLogin).next().isDone()
    })
  })

  describe('watchForLogOutStarted', () => {
    it('should respond to log out start', () => {
      const pattern: ActionType = 'LogOutStarted'
      const saga = testSaga(watchForLogOutStarted)
      saga.next().takeLatest(pattern, executeLogOut).next().isDone()
    })
  })
})
