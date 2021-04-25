import { getIsInternetReachable } from '../getIsInternetReachable'
import state from '../../__tests__/data/testApplicationState'

describe('getIsInternetReachable selector', () => {
  it('should return isInternetReachable', () => {
    expect(getIsInternetReachable(state)).toBeTruthy()
  })
})
