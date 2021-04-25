import { testSaga } from 'redux-saga-test-plan'

import { ActionType } from '../../actions/actionType'

import { switchDatabase } from '../../database'
import { watchStartUp } from '../realm'

describe('realm', () => {
  it('should respond to environment change', () => {
    const pattern: ActionType = 'StartUp'
    const saga = testSaga(watchStartUp)
    saga.next().takeLatest(pattern, switchDatabase).next().isDone()
  })
})
