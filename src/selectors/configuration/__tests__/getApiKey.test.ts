import { getApiKey } from '../getApiKey'
import state from '../../__tests__/data/testApplicationState'

describe('getApiKey selector', () => {
  it('should return the local configuration API key', () => {
    expect(getApiKey(state)).toEqual('test')
  })
})
