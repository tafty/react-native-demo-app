export interface LocalConfig {
  api: {
    remoteConfigUri: string
    key: string
    isStubbed: boolean
    isRemoteConfigEnabled: boolean
  }
  environment: string
  realm: {
    encrypted: boolean
  }
}
