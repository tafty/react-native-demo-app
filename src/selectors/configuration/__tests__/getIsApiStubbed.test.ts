import { getIsApiStubbed } from '../getIsApiStubbed'
import state from '../../__tests__/data/testApplicationState'

describe('getIsApiStubbed', () => {
  it('should return whether the local configuration indicates that the API is stubbed', () => {
    expect(getIsApiStubbed(state)).toBeTruthy()
  })
})
