import { getIsRemoteConfigEnabled } from '../getIsRemoteConfigEnabled'
import state from '../../__tests__/data/testApplicationState'

describe('getIsRemoteConfigEnabled', () => {
  it('should return whether the local configuration indicates that remote config is enabled', () => {
    expect(getIsRemoteConfigEnabled(state)).toBeTruthy()
  })
})
