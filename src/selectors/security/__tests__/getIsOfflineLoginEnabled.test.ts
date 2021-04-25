import { getIsOfflineLoginEnabled } from '../getIsOfflineLoginEnabled'
import state from '../../__tests__/data/testApplicationState'

describe('getIsOfflineLoginEnabled', () => {
  it('should return the whether offline login is enabled', () => {
    expect(getIsOfflineLoginEnabled(state)).toBeTruthy()
  })
})
