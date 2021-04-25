import { testSaga } from 'redux-saga-test-plan'

import executeStartUp from '../executeStartUp'
import performFetchRemoteConfig from '../performFetchRemoteConfig'

describe('executeStartUp', () => {
  it('should fetch the config', () => {
    const saga = testSaga(executeStartUp)
    saga.next().call(performFetchRemoteConfig).next().isDone()
  })
})
