jest.mock('uuid', () => {
  return {
    v4: () => {
      return '22657b1b-36f8-4520-8a40-3627b2b1b2f6'
    },
  }
})

import { login } from '../login'
import * as Keys from '../../timeoutKeys'

describe('login', () => {
  const password = 'password'
  const username = 'bob@bobbins.com'

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
  const body = { username, token: password }
  const path = '/login'
  const endpoint200 = 'http://localhost/200'
  const url200 = endpoint200 + path
  const endpointError = 'http://localhost/error'
  const urlError = endpointError + path
  const body200 = { done: true }
  const status200 = 200
  const errorToThrow = new Error('Deliberately thrown error')
  const fetchMock = require('fetch-mock-jest')
  fetchMock
    .post(url200, { body: body200, status: status200 }, { body, headers })
    .post(urlError, { throws: errorToThrow }, { body, headers })

  let hasTimeoutBeenRetrieve: boolean = false
  const getTimeout = (key: string) => {
    expect(key).toEqual(Keys.LOGIN)
    hasTimeoutBeenRetrieve = true
    return 120
  }

  beforeEach(() => {
    hasTimeoutBeenRetrieve = false
  })

  it('should login successfully', async () => {
    await login(
      password,
      username,
      endpoint200,
      apiKey,
      getTimeout,
      false,
    ).then(data => expect(data).toEqual({ data: body200, status: status200 }))

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should catch and pass on errors', async () => {
    // let hasTimeoutBeenRetrieve: boolean = false
    // const getTimeout = (key: string) => {
    //   expect(key).toEqual(Keys.LOGIN)
    //   hasTimeoutBeenRetrieve = true
    //   return 120
    // }
    const responseStatus = 0
    // const error = new Error('Deliberately thrown error')
    // const mockResponse = {
    //   status: responseStatus,
    //   json: () => {
    //     throw error
    //   },
    // }

    // fetch = jest.fn((endpoint, options) => {
    //   expect(hasTimeoutBeenRetrieve).toBeTruthy()
    //   expect(endpoint).toEqual(apiEndPoint + '/login')
    //   expect(options).toEqual({
    //     body: '{"username":"' + username + '","token":"' + password + '"}',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       'API-KEY': apiKey,
    //       'X-Correlation-ID': '22657b1b-36f8-4520-8a40-3627b2b1b2f6',
    //       'X-DeviceInfo-AppVersion': '1.0.2',
    //       'X-DeviceInfo-BuildNumber': '10000002',
    //       'X-DeviceInfo-DeviceBrand': 'Apple',
    //       'X-DeviceInfo-DeviceID': 'this_is_a_unique_device_id',
    //       'X-DeviceInfo-DeviceModel': 'iPhone 6',
    //       'X-DeviceInfo-SystemName': 'iOS',
    //       'X-DeviceInfo-SystemVersion': '12.0',
    //     },
    //     method: 'POST',
    //   })

    //   return new Promise(resolve => resolve(mockResponse))
    // })

    await login(
      password,
      username,
      endpointError,
      apiKey,
      getTimeout,
      false,
    ).then(data =>
      expect(data).toEqual({ error: errorToThrow, status: responseStatus }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should return the password as the status when the API stub is enabled', async () => {
    const apiEndPoint = 'http://localhost'

    await login('200', username, apiEndPoint, apiKey, getTimeout, true).then(
      data => {
        expect(data).toEqual({ data: { userId: 1 }, status: 200 })
        expect(hasTimeoutBeenRetrieve).toBeFalsy()
      },
    )

    expect(hasTimeoutBeenRetrieve).toBeFalsy()
  })
})
