import { getRealmPath } from '../getRealmPath'
import state from '../../__tests__/data/testApplicationState'

describe('getRealmPath Selector', () => {
  it('should return the path, based on current environment and settings', () => {
    const path = getRealmPath(state)
    expect(path).toEqual('test.realm')
  })
})
