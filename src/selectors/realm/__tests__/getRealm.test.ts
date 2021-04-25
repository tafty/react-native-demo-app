import Realm from 'realm'
import { getRealm } from '../getRealm'
import realmHolder from '../../../database'
import state from '../../__tests__/data/testApplicationState'

jest.mock('realm', () => {
  class MockRealm {
    path = 'path/to/realm'
  }
  return MockRealm
})

describe('getRealm selector', () => {
  realmHolder.realm = new Realm()

  it('should return the current realm', () => {
    expect(getRealm(state)).toEqual(realmHolder.realm)
  })
})
