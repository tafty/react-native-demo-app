import { getHasRemoteConfigLoadSucceeded } from '../getHasRemoteConfigLoadSucceeded'
import state from '../../__tests__/data/testApplicationState'

describe('getHasRemoteConfigLoadSucceeded', () => {
  it('should return the value of hasRemoteConfigLoadSucceeded', () => {
    expect(getHasRemoteConfigLoadSucceeded(state)).toBeTruthy()
  })
})
