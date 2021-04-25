import { getRemoteConfigUri } from '../getRemoteConfigUri'
import state from '../../__tests__/data/testApplicationState'

describe('getRemoteConfigUri', () => {
  it('should return the local configuration API URI for the running environment', () => {
    expect(getRemoteConfigUri(state)).toEqual('test')
  })
})
