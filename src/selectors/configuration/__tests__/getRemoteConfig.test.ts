import { getRemoteConfig } from '../getRemoteConfig'
import state from '../../__tests__/data/testApplicationState'

describe('getRemoteConfig', () => {
  it('should return the remote config', () => {
    expect(getRemoteConfig(state)).toEqual(state.configuration.remoteConfig)
  })
})
