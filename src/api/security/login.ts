import deviceLog from 'react-native-device-log'

import APICallHeaders from '../apiCallHeaders'
import fetchWithTimeout from '../fetchWithTimeout'
import * as timeoutKeys from '../timeoutKeys'

export type LoginResponseData = {
  userId: number
}

export type LoginResponse = {
  data?: LoginResponseData
  error?: string
  status: number
}

export function login(
  token: string,
  username: string,
  apiEndPoint: string,
  apiKey: string,
  getTimeoutInMilliseconds: Function,
  isApiStubbed: boolean,
  password: string = '200',
): Promise<LoginResponse> {
  return new Promise(resolve => {
    if (isApiStubbed) {
      return resolve({ status: parseInt(password, 10), data: { userId: 1 } })
    }

    const authenticationEndPoint = `${apiEndPoint}/login`
    deviceLog.debug('Login', username, authenticationEndPoint)

    let responseStatus = -1

    const headers = APICallHeaders.createAPICallHeaders(
      apiKey,
    ).withContentType().headers
    const timeoutInMilliseconds = getTimeoutInMilliseconds(timeoutKeys.LOGIN)

    fetchWithTimeout(
      authenticationEndPoint,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ username, token }),
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
        deviceLog.error('Login error', error)
        return resolve({ status: 0, error })
      })
  })
}
