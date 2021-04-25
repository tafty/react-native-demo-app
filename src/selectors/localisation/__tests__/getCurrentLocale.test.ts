import { getCurrentLocale } from '../getCurrentLocale'
import state from '../../__tests__/data/testApplicationState'

describe('getCurrentLocale selector', () => {
  it('should return locale', () => {
    expect(getCurrentLocale(state)).toEqual('en-GB')
  })
})
