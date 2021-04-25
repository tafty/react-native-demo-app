import { testSaga } from 'redux-saga-test-plan'

import executeLogOut from '../executeLogOut'

import CurrentModels from '../../../models'
import { getRealm } from '../../../selectors/realm/getRealm'

const { SecuritySession } = CurrentModels

describe('executeLogout', () => {
  it('should delete the security session if it exists', () => {
    let isWriteCalled = false
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = '1'

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
    const saga = testSaga(executeLogOut)
    saga.next().select(getRealm).next(realm).isDone()

    expect(isWriteCalled).toBeTruthy()
  })
})
