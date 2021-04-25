import configuration from '../configuration'
import { createAction } from '../../actions/createAction'

const localConfig = {
  api: {
    isRemoteConfigEnabled: true,
    isStubbed: true,
    key: 'test',
    remoteConfigUri: 'test',
  },
  environment: 'test',
  realm: {
    encrypted: true,
  },
}

const remoteConfig = {
  api: {
    uri: 'http://localhost:18083/v1',
    timeoutsInSeconds: [
      { key: 'default', value: 120 },
      { key: 'authentication', value: 120 },
      { key: 'configuration', value: 120 },
    ],
  },
  configuration: {},
  security: {
    sessionTimeOutInMinutes: 0,
    hasEnforcedLoginOnForeground: false,
    isOfflineLoginEnabled: false,
  },
}

describe('Configuration Reducer', () => {
  it('should contain all of the local config', () => {
    expect(configuration().localConfig).toBeDefined()
  })

  it('should merge in the new configuration', () => {
    const config = {
      api: {
        uri: 'url',
        timeoutsInSeconds: [{ key: 'default', value: 120 }],
      },
      configuration: {},
      security: {
        sessionTimeOutInMinutes: 60,
        hasEnforcedLoginOnForeground: true,
        isOfflineLoginEnabled: true,
      },
    }

    const action = createAction('ConfigurationLoadSucceeded', { config })
    const state = configuration(undefined, action)

    expect(state.hasRemoteConfigLoadSucceeded).toBeTruthy()
    expect(state.isLoadingRemoteConfig).toBeFalsy()
    expect(state.remoteConfig).toEqual(config)
  })

  it('should update the state to show configuration is loading', () => {
    const initialState = {
      hasLoadingRemoteConfigStarted: false,
      hasRemoteConfigLoadSucceeded: undefined,
      isLoadingRemoteConfig: false,
      localConfig,
      remoteConfig,
    }

    const action = createAction('ConfigurationLoadStarted', {})
    const state = configuration(initialState, action)

    expect(state.hasLoadingRemoteConfigStarted).toBeTruthy()
    expect(state.isLoadingRemoteConfig).toBeTruthy()
  })

  it('should update the state to show configuration has finished if load fails', () => {
    const initialState = {
      hasLoadingRemoteConfigStarted: false,
      hasRemoteConfigLoadSucceeded: true,
      isLoadingRemoteConfig: true,
      localConfig,
      remoteConfig,
    }

    const action = createAction('ConfigurationLoadFailed', {})
    const state = configuration(initialState, action)

    expect(state.hasRemoteConfigLoadSucceeded).toBeFalsy()
    expect(state.isLoadingRemoteConfig).toBeFalsy()
  })
})
