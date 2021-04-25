import combineReducers from '../index'

const Config = require('../../config/config.json')
const DefaultRemoteConfig = require('../../config/defaultRemoteConfig.json')

const state = {
  app: {
    hasAppInitialised: false,
    isActive: false,
  },
  configuration: {
    hasLoadingRemoteConfigStarted: false,
    hasRemoteConfigLoadSucceeded: undefined,
    isLoadingRemoteConfig: false,
    localConfig: Config,
    remoteConfig: DefaultRemoteConfig,
  },
  localisation: {
    locale: 'en-gb',
  },
  networkConnection: {
    isConnected: false,
    isInternetReachable: false,
    connectionType: undefined,
  },
  realm: {
    databaseLoaded: false,
    savingData: false,
    loadingData: false,
    migratingDatabase: false,
    closingDatabase: false,
    path: '',
  },
  security: {
    error: undefined,
    isAuthenticating: false,
    isLoggedIn: false,
    isLoginRequired: true,
    isOnlineLoginRequired: true,
    username: undefined,
  },
}

const action = {
  type: 'testing',
}

describe('Combined reducers', () => {
  it('should contain the app reducer', () => {
    const reducers = combineReducers(state, action)

    expect(reducers.app).toBeDefined()
  })

  it('should contain the configuration reducer', () => {
    const reducers = combineReducers(state, action)

    expect(reducers.configuration).toBeDefined()
  })

  it('should contain the localisation reducer', () => {
    const reducers = combineReducers(state, action)

    expect(reducers.localisation).toBeDefined()
  })

  it('should contain the network connection reducer', () => {
    const reducers = combineReducers(state, action)

    expect(reducers.networkConnection).toBeDefined()
  })

  it('should contain the realm reducer', () => {
    const reducers = combineReducers(state, action)

    expect(reducers.realm).toBeDefined()
  })

  it('should contain the security reducer', () => {
    const reducers = combineReducers(state, action)

    expect(reducers.security).toBeDefined()
  })
})
