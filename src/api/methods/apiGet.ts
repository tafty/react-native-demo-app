import APICallHeaders from '../apiCallHeaders'
import IApiError from '../definitions/apiError'
import R from 'ramda'
import deviceLog from 'react-native-device-log'
import fetchWithTimeout from '../fetchWithTimeout'
import statusToApiError from './statusToApiError'

const apiGet = <ResponseData, Model>(
  apiEndPoint: string,
  apiKey: string,
  accessToken: string,
  getTimeoutInMilliseconds: Function,
  timeoutKey: string,
  apiPath: string,
  stubResponse: ResponseData,
  mapper: (data: ResponseData) => Model,
  isApiStubbed: boolean,
): Promise<Model> => {
  return new Promise((resolve, reject: (apiError: IApiError) => void) => {
    if (isApiStubbed) {
      return resolve(mapper(stubResponse))
    }

    const endPoint = apiEndPoint + apiPath

    let status = 0

    const headers = APICallHeaders.createAPICallHeaders(
      apiKey,
      accessToken,
    ).withContentType().headers
    const timeoutInMilliseconds = getTimeoutInMilliseconds(timeoutKey)

    fetchWithTimeout(
      endPoint,
      {
        method: 'GET',
        headers,
        cache: 'no-cache',
      },
      timeoutInMilliseconds,
    )
      .then(response => {
        try {
          status = response.status
          return response.json()
        } catch {
          return { error: response }
        }
      })
      .then((responseData: ResponseData) => {
        if (status < 200 || status >= 300) {
          const error = statusToApiError(status)

          if (!R.isNil(error) && !R.isEmpty(error)) {
            reject({ error, status })
          }
        }

        const models = mapper(responseData)

        return resolve(models)
      })
      .catch(error => {
        deviceLog.error(`Error calling ${endPoint}`, error)
        return reject({ error: error.toString(), status })
      })
  })
}

export default apiGet
