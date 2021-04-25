import { getApiCallTimeoutInMilliseconds } from '../getApiCallTimeoutInMilliseconds'
import state from '../../__tests__/data/testApplicationState'

describe('getApiCallTimeoutInMilliseconds selector', () => {
  it('should return default if key in milliseconds is not recognised', () => {
    expect(getApiCallTimeoutInMilliseconds(state)('unknown')).toEqual(1000)
  })

  it('should return the correct timeout in milliseconds if key is recognised', () => {
    expect(getApiCallTimeoutInMilliseconds(state)('submit')).toEqual(2000)
  })

  it('should return the correct time out in milliseconds if key is supplied in uppercase', () => {
    expect(getApiCallTimeoutInMilliseconds(state)('RETRIEVE')).toEqual(3000)
  })
})
