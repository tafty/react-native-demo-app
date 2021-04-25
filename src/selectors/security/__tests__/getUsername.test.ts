import { getUsername } from '../getUsername'
import state from '../../__tests__/data/testApplicationState'

describe('getUsername selector', () => {
  it('should return the logged in username', () => {
    expect(getUsername(state)).toEqual('bob')
  })
})
