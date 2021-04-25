import APICallHeaders from '../apiCallHeaders'
import IApiError from '../definitions/apiError'
import R from 'ramda'
import deviceLog from 'react-native-device-log'
import fetchWithTimeout from '../fetchWithTimeout'
import statusToApiError from './statusToApiError'

const apiUpdate = <RequestModel, RequestData, ResponseData, ResponseModel>(
  apiEndPoint: string,
  apiKey: string,
  accessToken: string,
  getTimeoutInMilliseconds: Function,
  timeoutKey: string,
  apiPath: string,
  stubResponse: ResponseData,
  requestMapper: (data: RequestModel) => RequestData,
  responseMapper: (data: ResponseData) => ResponseModel,
  data: RequestModel,
  method: 'POST' | 'PUT' | 'PATCH',
  isApiStubbed: boolean,
): Promise<ResponseModel> => {
  return new Promise((resolve, reject: (apiError: IApiError) => void) => {
    if (isApiStubbed) {
      return resolve(responseMapper(stubResponse))
    }

    const endPoint = apiEndPoint + apiPath

    let status = 0

    const headers = APICallHeaders.createAPICallHeaders(
      apiKey,
      accessToken,
    ).withContentType().headers
    const timeoutInMilliseconds = getTimeoutInMilliseconds(timeoutKey)

    const body = JSON.stringify(requestMapper(data))

    fetchWithTimeout(
      endPoint,
      {
        method,
        headers,
        body,
      },
      timeoutInMilliseconds,
    )
      .then(response => {
        status = response.status

        if (status < 200 || status >= 300) {
          deviceLog.error(response)
          return { error: response }
        }

        return response.json()
      })
      .then((responseData: ResponseData) => {
        if (status < 200 || status >= 300) {
          const error = statusToApiError(status)

          if (!R.isNil(error) && !R.isEmpty(error)) {
            reject({ error, status })
          }
        }

        const models = responseMapper(responseData)

        return resolve(models)
      })
      .catch(error => {
        deviceLog.error(`Error calling ${endPoint}`, error)
        return reject({ error: error.toString(), status })
      })
  })
}

export default apiUpdate
