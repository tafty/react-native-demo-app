import { getSessionTimeOutInMinutes } from '../getSessionTimeOutInMinutes'
import state from '../../__tests__/data/testApplicationState'

describe('getIsOfflineLoginEnabled', () => {
  it('should return the whether offline login is enabled', () => {
    expect(getSessionTimeOutInMinutes(state)).toEqual(120)
  })
})
