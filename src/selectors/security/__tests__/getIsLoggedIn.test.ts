import { getIsLoggedIn } from '../getIsLoggedIn'
import state from '../../__tests__/data/testApplicationState'

describe('getIsLoggedIn selector', () => {
  it('should return whether the app is logged in', () => {
    expect(getIsLoggedIn(state)).toBeTruthy()
  })
})
