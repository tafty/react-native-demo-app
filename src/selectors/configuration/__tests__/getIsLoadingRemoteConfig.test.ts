import { getIsLoadingRemoteConfig } from '../getIsLoadingRemoteConfig'
import state from '../../__tests__/data/testApplicationState'

describe('getIsLoadingRemoteConfig', () => {
  it('should return the value of isLoadingRemoteConfig', () => {
    expect(getIsLoadingRemoteConfig(state)).toBeTruthy()
  })
})
