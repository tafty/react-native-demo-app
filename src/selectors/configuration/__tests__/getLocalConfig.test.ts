import { getLocalConfig } from '../getLocalConfig'
import state from '../../__tests__/data/testApplicationState'

describe('getLocalConfig', () => {
  it('should return the local config', () => {
    expect(getLocalConfig(state)).toEqual(state.configuration.localConfig)
  })
})
