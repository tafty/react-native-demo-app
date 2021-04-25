import deviceLog from 'react-native-device-log'

import APICallHeaders from '../apiCallHeaders'
import fetchWithTimeout from '../fetchWithTimeout'
import * as timeoutKeys from '../timeoutKeys'
import { RemoteConfig } from '../../config/remoteConfig'

const SCHEMA_VERSION = '1.0'

export type RemoteConfigResponse = {
  data?: RemoteConfig
  error?: string
  status: number
}

export function fetchRemoteConfig(
  configurationEndPoint: string,
  apiKey: string,
  getTimeoutInMilliseconds: Function,
  isRemoteConfigEnabled: boolean = false,
): Promise<RemoteConfigResponse> {
  return new Promise((resolve, _reject) => {
    if (!isRemoteConfigEnabled) {
      deviceLog.debug('Remote Config is a stub')
      const stub = require('../../config/defaultRemoteConfig.json')
      return resolve({ status: 200, data: stub })
    }

    // TODO When a remote config endpoint is implemented this should be updated to reflect the correct URI
    const endPoint = configurationEndPoint + '?schemaVersion=' + SCHEMA_VERSION

    deviceLog.debug('Remote Config', endPoint)

    let responseStatus = -1

    const headers = APICallHeaders.createAPICallHeaders(
      apiKey,
    ).withContentType().headers
    const timeoutInMilliseconds = getTimeoutInMilliseconds(
      timeoutKeys.CONFIGURATION,
    )

    fetchWithTimeout(
      endPoint,
      {
        method: 'GET',
        headers: headers,
      },
      timeoutInMilliseconds,
    )
      .then(response => {
        responseStatus = response.status
        return response.json()
      })
      .then(responseData => {
        return resolve({ status: responseStatus, data: responseData })
      })
      .catch(error => {
        deviceLog.error('Remote Config error', error)
        return resolve({ status: 0, error })
      })
  })
}
