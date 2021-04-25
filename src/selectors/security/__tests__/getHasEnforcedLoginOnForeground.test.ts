import { getHasEnforcedLoginOnForeground } from '../getHasEnforcedLoginOnForeground'
import state from '../../__tests__/data/testApplicationState'

describe('getHasEnforcedLoginOnForeground', () => {
  it('should return the whether the app is configured to enforce login', () => {
    expect(getHasEnforcedLoginOnForeground(state)).toBeTruthy()
  })
})
