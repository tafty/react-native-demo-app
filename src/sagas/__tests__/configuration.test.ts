import { testSaga } from 'redux-saga-test-plan'

import executeNetworkStatusUpdated from '../configuration/executeNetworkStatusUpdated'
import executeStartUp from '../configuration/executeStartUp'

import { watchForNetworkStatusUpdated, watchStartUp } from '../configuration'

import { ActionType } from '../../actions/actionType'

describe('Configuration Sagas', () => {
  describe('watchStartUp', () => {
    it('should respond to configuration loads', () => {
      const pattern: ActionType = 'StartUp'
      const saga = testSaga(watchStartUp)
      saga.next().takeLatest(pattern, executeStartUp).next().isDone()
    })
  })

  describe('watchForNetworkStatusUpdated', () => {
    it('should respond to configuration loads', () => {
      const pattern: ActionType = 'NetworkStatusUpdate'
      const saga = testSaga(watchForNetworkStatusUpdated)
      saga
        .next()
        .takeLatest(pattern, executeNetworkStatusUpdated)
        .next()
        .isDone()
    })
  })
})
