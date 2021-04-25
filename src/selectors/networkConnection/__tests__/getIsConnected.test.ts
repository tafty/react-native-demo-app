import { getIsConnected } from '../getIsConnected'
import state from '../../__tests__/data/testApplicationState'

describe('getIsConnected selector', () => {
  it('should return isConnected true', () => {
    expect(getIsConnected(state)).toBeTruthy()
  })
})
