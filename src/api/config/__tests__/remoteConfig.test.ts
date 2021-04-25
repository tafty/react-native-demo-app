jest.mock('uuid', () => {
  return {
    v4: () => {
      return '22657b1b-36f8-4520-8a40-3627b2b1b2f6'
    },
  }
})

import { fetchRemoteConfig } from '../remoteConfig'
import * as Keys from '../../timeoutKeys'

const defaultRemoteConfig = require('../../../config/defaultRemoteConfig.json')

const schemaQuerystring = '?schemaVersion=1.0'

describe('fetchRemoteConfig', () => {
  const apiKey = '33b938439f7f407d8b4b112ec7020b83'
  const headers = {
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
  }
  const endpoint200 = 'http://localhost/200'
  const url200 = endpoint200 + schemaQuerystring
  const endpointError = 'http://localhost/error'
  const urlError = endpointError + schemaQuerystring
  const body200 = { done: true }
  const status200 = 200
  const errorToThrow = new Error('Deliberately thrown error')
  const fetchMock = require('fetch-mock-jest')
  fetchMock
    .get(url200, { body: body200, status: status200 }, { headers })
    .get(urlError, { throws: errorToThrow }, { headers })

  let hasTimeoutBeenRetrieve: boolean = false
  const getTimeout = (key: string) => {
    expect(key).toEqual(Keys.CONFIGURATION)
    hasTimeoutBeenRetrieve = true
    return 120
  }

  beforeEach(() => {
    hasTimeoutBeenRetrieve = false
  })

  it('should fetch remote config successfully', async () => {
    const isRemoteConfigEnabled = true

    await fetchRemoteConfig(
      endpoint200,
      apiKey,
      getTimeout,
      isRemoteConfigEnabled,
    ).then(data => expect(data).toEqual({ data: body200, status: status200 }))

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should catch and pass on errors', async () => {
    const isRemoteConfigEnabled = true
    const responseStatus = 0

    await fetchRemoteConfig(
      endpointError,
      apiKey,
      getTimeout,
      isRemoteConfigEnabled,
    ).then(data =>
      expect(data).toEqual({ error: errorToThrow, status: responseStatus }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should return the default fetch remote config if remote config is disabled', async () => {
    const configurationEndPoint = 'http://localhost/config'
    const isRemoteConfigEnabled = false
    const responseStatus = 200

    await fetchRemoteConfig(
      configurationEndPoint,
      apiKey,
      getTimeout,
      isRemoteConfigEnabled,
    ).then(data =>
      expect(data).toEqual({
        data: defaultRemoteConfig,
        status: responseStatus,
      }),
    )

    expect(hasTimeoutBeenRetrieve).toBeFalsy()
  })
})
