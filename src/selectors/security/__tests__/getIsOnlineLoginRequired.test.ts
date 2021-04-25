import { getIsOnlineLoginRequired } from '../getIsOnlineLoginRequired'
import state from '../../__tests__/data/testApplicationState'

describe('getIsOnlineLoginRequired selector', () => {
  it('should return whether online login is required', () => {
    expect(getIsOnlineLoginRequired(state)).toBeTruthy()
  })
})
