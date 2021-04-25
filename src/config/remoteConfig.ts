export interface RemoteConfigApiTimeout {
  key: string
  value: number
}

export interface RemoteConfig {
  api: {
    uri: string
    timeoutsInSeconds: Array<RemoteConfigApiTimeout>
  }
  configuration: {}
  security: {
    sessionTimeOutInMinutes: number
    hasEnforcedLoginOnForeground: boolean
    isOfflineLoginEnabled: boolean
  }
}
