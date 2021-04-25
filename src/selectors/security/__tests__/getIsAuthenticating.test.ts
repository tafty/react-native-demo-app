import { getIsAuthenticating } from '../getIsAuthenticating'
import state from '../../__tests__/data/testApplicationState'

describe('getIsAuthenticating selector', () => {
  it('should return whether the app is authenticating', () => {
    expect(getIsAuthenticating(state)).toBeTruthy()
  })
})
