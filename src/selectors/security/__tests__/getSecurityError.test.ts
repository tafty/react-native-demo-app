import { getSecurityError } from '../getSecurityError'
import state from '../../__tests__/data/testApplicationState'

describe('getSecurityError selector', () => {
  it('should return the security error', () => {
    expect(getSecurityError(state)).toEqual(state.security.error)
  })
})
