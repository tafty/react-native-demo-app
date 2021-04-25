import { testSaga } from 'redux-saga-test-plan'

import executeNetworkStatusUpdated from '../executeNetworkStatusUpdated'
import performFetchRemoteConfig from '../performFetchRemoteConfig'

describe('executeNetworkStatusUpdated', () => {
  it('should fetch the config', () => {
    const saga = testSaga(executeNetworkStatusUpdated)
    saga.next().call(performFetchRemoteConfig).next().isDone()
  })
})
