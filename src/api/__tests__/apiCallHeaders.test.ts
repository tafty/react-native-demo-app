jest.mock('uuid', () => {
  return {
    v4: () => {
      return '22657b1b-36f8-4520-8a40-3627b2b1b2f6'
    },
  }
})

import DeviceInfo from 'react-native-device-info'

import APICallHeaders from '../apiCallHeaders'

describe('APICallHeaders', () => {
  const apiKey = '33b938439f7f407d8b4b112ec7020b83'

  it('should have the correlation id available', () => {
    const headers = APICallHeaders.createAPICallHeaders(apiKey)
    expect(headers.correlationId).toEqual(
      '22657b1b-36f8-4520-8a40-3627b2b1b2f6',
    )
  })

  it('should return the correct API headers with content type but without a token', () => {
    const headers = APICallHeaders.createAPICallHeaders(
      apiKey,
    ).withContentType().headers

    expect(headers).toEqual({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'API-KEY': apiKey,
      'X-Correlation-ID': '22657b1b-36f8-4520-8a40-3627b2b1b2f6',
      'X-DeviceInfo-AppVersion': '1.0.2',
      'X-DeviceInfo-BuildNumber': '10000002',
      'X-DeviceInfo-DeviceBrand': 'Apple',
      'X-DeviceInfo-DeviceID': 'this_is_a_unique_device_id',
      'X-DeviceInfo-DeviceModel': 'iPhone 6',
      'X-DeviceInfo-SystemName': 'iOS',
      'X-DeviceInfo-SystemVersion': '12.0',
    })
  })

  it('should return the correct API headers with content type and a token', () => {
    const token = 'a-token'
    const headers = APICallHeaders.createAPICallHeaders(
      apiKey,
      token,
    ).withContentType().headers

    expect(headers).toEqual({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'API-KEY': apiKey,
      'X-Correlation-ID': '22657b1b-36f8-4520-8a40-3627b2b1b2f6',
      'X-DeviceInfo-AppVersion': '1.0.2',
      'X-DeviceInfo-BuildNumber': '10000002',
      'X-DeviceInfo-DeviceBrand': 'Apple',
      'X-DeviceInfo-DeviceID': 'this_is_a_unique_device_id',
      'X-DeviceInfo-DeviceModel': 'iPhone 6',
      'X-DeviceInfo-SystemName': 'iOS',
      'X-DeviceInfo-SystemVersion': '12.0',
      'X-Authentication-Token': token,
    })
  })

  it('should return the correct API headers without a token', () => {
    const headers = APICallHeaders.createAPICallHeaders(apiKey).headers

    expect(headers).toEqual({
      'API-KEY': apiKey,
      'X-Correlation-ID': '22657b1b-36f8-4520-8a40-3627b2b1b2f6',
      'X-DeviceInfo-AppVersion': '1.0.2',
      'X-DeviceInfo-BuildNumber': '10000002',
      'X-DeviceInfo-DeviceBrand': 'Apple',
      'X-DeviceInfo-DeviceID': 'this_is_a_unique_device_id',
      'X-DeviceInfo-DeviceModel': 'iPhone 6',
      'X-DeviceInfo-SystemName': 'iOS',
      'X-DeviceInfo-SystemVersion': '12.0',
    })
  })

  it('should return the correct API headers with a token', () => {
    const token = 'a-token'
    const headers = APICallHeaders.createAPICallHeaders(apiKey, token).headers

    expect(headers).toEqual({
      'API-KEY': apiKey,
      'X-Correlation-ID': '22657b1b-36f8-4520-8a40-3627b2b1b2f6',
      'X-DeviceInfo-AppVersion': '1.0.2',
      'X-DeviceInfo-BuildNumber': '10000002',
      'X-DeviceInfo-DeviceBrand': 'Apple',
      'X-DeviceInfo-DeviceID': 'this_is_a_unique_device_id',
      'X-DeviceInfo-DeviceModel': 'iPhone 6',
      'X-DeviceInfo-SystemName': 'iOS',
      'X-DeviceInfo-SystemVersion': '12.0',
      'X-Authentication-Token': token,
    })
  })

  it('should return the correct API headers for upload without a token', () => {
    const headers = APICallHeaders.createAPICallHeaders(apiKey).withAccept()
      .headers

    expect(headers).toEqual({
      Accept: 'application/json',
      'API-KEY': apiKey,
      'X-Correlation-ID': '22657b1b-36f8-4520-8a40-3627b2b1b2f6',
      'X-DeviceInfo-AppVersion': '1.0.2',
      'X-DeviceInfo-BuildNumber': '10000002',
      'X-DeviceInfo-DeviceBrand': 'Apple',
      'X-DeviceInfo-DeviceID': 'this_is_a_unique_device_id',
      'X-DeviceInfo-DeviceModel': 'iPhone 6',
      'X-DeviceInfo-SystemName': 'iOS',
      'X-DeviceInfo-SystemVersion': '12.0',
    })
  })

  it('should return the correct API headers for upload with content type and a token', () => {
    const token = 'a-token'
    const headers = APICallHeaders.createAPICallHeaders(
      apiKey,
      token,
    ).withAccept().headers

    expect(headers).toEqual({
      Accept: 'application/json',
      'API-KEY': apiKey,
      'X-Correlation-ID': '22657b1b-36f8-4520-8a40-3627b2b1b2f6',
      'X-DeviceInfo-AppVersion': '1.0.2',
      'X-DeviceInfo-BuildNumber': '10000002',
      'X-DeviceInfo-DeviceBrand': 'Apple',
      'X-DeviceInfo-DeviceID': 'this_is_a_unique_device_id',
      'X-DeviceInfo-DeviceModel': 'iPhone 6',
      'X-DeviceInfo-SystemName': 'iOS',
      'X-DeviceInfo-SystemVersion': '12.0',
      'X-Authentication-Token': token,
    })
  })

  it('should convert old iOS system name to iOS', () => {
    DeviceInfo.getSystemName = () => {
      return 'iPhone OS'
    }

    const headers = APICallHeaders.createAPICallHeaders(apiKey).headers

    expect(headers).toEqual({
      'API-KEY': apiKey,
      'X-Correlation-ID': '22657b1b-36f8-4520-8a40-3627b2b1b2f6',
      'X-DeviceInfo-AppVersion': '1.0.2',
      'X-DeviceInfo-BuildNumber': '10000002',
      'X-DeviceInfo-DeviceBrand': 'Apple',
      'X-DeviceInfo-DeviceID': 'this_is_a_unique_device_id',
      'X-DeviceInfo-DeviceModel': 'iPhone 6',
      'X-DeviceInfo-SystemName': 'iOS',
      'X-DeviceInfo-SystemVersion': '12.0',
    })
  })
})
