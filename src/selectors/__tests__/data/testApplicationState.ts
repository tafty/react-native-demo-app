import type { ApplicationState } from '../../../reducers'
import ResponseError from '../../../models/internal/responseError'

const state: ApplicationState = {
  app: {
    hasAppInitialised: true,
    isActive: true,
  },
  configuration: {
    hasLoadingRemoteConfigStarted: true,
    hasRemoteConfigLoadSucceeded: true,
    isLoadingRemoteConfig: true,
    localConfig: {
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
    },
    remoteConfig: {
      api: {
        timeoutsInSeconds: [
          { key: 'default', value: 1 },
          { key: 'submit', value: 2 },
          { key: 'retrieve', value: 3 },
        ],
        uri: 'test',
      },
      configuration: {},
      security: {
        hasEnforcedLoginOnForeground: true,
        isOfflineLoginEnabled: true,
        sessionTimeOutInMinutes: 120,
      },
    },
  },
  localisation: {
    locale: 'en-GB',
  },
  networkConnection: {
    connectionType: 'testing',
    isConnected: true,
    isInternetReachable: true,
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
    isAuthenticating: true,
    isLoggedIn: true,
    isLoginRequired: true,
    isOnlineLoginRequired: true,
    error: new ResponseError(500, 'server error'),
    username: 'bob',
  },
}

export default state
