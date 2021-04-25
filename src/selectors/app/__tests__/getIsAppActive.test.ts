import { getIsAppActive } from '../getIsAppActive'
import state from '../../__tests__/data/testApplicationState'

describe('getIsAppActive selector', () => {
  it('should return whether the app is active', () => {
    expect(getIsAppActive(state)).toBeTruthy()
  })
})
