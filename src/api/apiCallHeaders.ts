import * as R from 'ramda'
import DeviceInfo from 'react-native-device-info'
import uuid from 'uuid'

class APICallHeaders {
  correlationId: string
  headers: any

  constructor(correlationId: string) {
    this.correlationId = correlationId
  }

  static createAPICallHeaders = (apiKey: string, token?: string) => {
    const apiCallHeaders: APICallHeaders = new APICallHeaders(uuid.v4())

    const systemName = DeviceInfo.getSystemName()
    const systemNameHeader =
      systemName.includes('iPhone') || systemName.includes('iphone')
        ? 'iOS'
        : systemName

    apiCallHeaders.headers = {
      'X-Correlation-ID': apiCallHeaders.correlationId,
      'X-DeviceInfo-DeviceID': DeviceInfo.getUniqueId(),
      'X-DeviceInfo-DeviceBrand': DeviceInfo.getBrand(),
      'X-DeviceInfo-DeviceModel': DeviceInfo.getModel(),
      'X-DeviceInfo-AppVersion': DeviceInfo.getVersion(),
      'X-DeviceInfo-BuildNumber': DeviceInfo.getBuildNumber(),
      'X-DeviceInfo-SystemName': systemNameHeader,
      'X-DeviceInfo-SystemVersion': DeviceInfo.getSystemVersion(),
      'API-KEY': apiKey,
    }

    return apiCallHeaders.withToken(token)
  }

  withAccept = () => {
    this.headers = {
      ...this.headers,
      Accept: 'application/json',
    }

    return this
  }

  withContentType = () => {
    this.headers = {
      ...this.headers,
      'Content-Type': 'application/json',
    }

    return this.withAccept()
  }

  withToken = (token?: string) => {
    if (!R.isNil(token)) {
      this.headers = {
        ...this.headers,
        'X-Authentication-Token': token,
      }
    }

    return this
  }
}

export default APICallHeaders
