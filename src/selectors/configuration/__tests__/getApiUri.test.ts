import { getApiUri } from '../getApiUri'
import state from '../../__tests__/data/testApplicationState'

describe('getApiUri selector', () => {
  it('should return the remote config uri', () => {
    expect(getApiUri(state)).toEqual('test')
  })
})
