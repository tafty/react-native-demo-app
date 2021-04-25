import { getIsLoginRequired } from '../getIsLoginRequired'
import state from '../../__tests__/data/testApplicationState'

describe('getIsLoginRequired selector', () => {
  it('should return whether login is required', () => {
    expect(getIsLoginRequired(state)).toBeTruthy()
  })
})
