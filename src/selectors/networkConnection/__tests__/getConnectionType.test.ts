import { getConnectionType } from '../getConnectionType'
import state from '../../__tests__/data/testApplicationState'

describe('getConnectionType selector', () => {
  it('should return the connection type', () => {
    expect(getConnectionType(state)).toEqual('testing')
  })
})
