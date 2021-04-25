import { getEnvironment } from '../getEnvironment'
import state from '../../__tests__/data/testApplicationState'

describe('getEnvironment', () => {
  it('should return the local configuration  environment', () => {
    expect(getEnvironment(state)).toEqual('test')
  })
})
