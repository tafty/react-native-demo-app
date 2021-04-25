import apiUpdate from '../apiUpdate'

jest.mock('uuid', () => {
  return {
    v4: () => {
      return '22657b1b-36f8-4520-8a40-3627b2b1b2f6'
    },
  }
})

describe('apiUpdate', () => {
  const apiKey = 'api_key'
  const accessToken = '33b938439f7f407d8b4b112ec7020b83'
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Authentication-Token': accessToken,
    'X-Correlation-ID': '22657b1b-36f8-4520-8a40-3627b2b1b2f6',
    'X-DeviceInfo-DeviceID': 'this_is_a_unique_device_id',
    'X-DeviceInfo-DeviceBrand': 'Apple',
    'X-DeviceInfo-DeviceModel': 'iPhone 6',
    'X-DeviceInfo-AppVersion': '1.0.2',
    'X-DeviceInfo-BuildNumber': '10000002',
    'X-DeviceInfo-SystemName': 'iOS',
    'X-DeviceInfo-SystemVersion': '12.0',
    'API-KEY': apiKey,
  }
  const apiPath = '/path/to/get'
  const endpoint200 = 'http://localhost/200'
  const url200 = endpoint200 + apiPath
  const endpoint200NoData = 'http://localhost/200/nodata'
  const url200NoData = endpoint200NoData + apiPath
  const endpoint400 = 'http://localhost/400'
  const url400 = endpoint400 + apiPath
  const endpoint401 = 'http://localhost/401'
  const url401 = endpoint401 + apiPath
  const endpoint403 = 'http://localhost/403'
  const url403 = endpoint403 + apiPath
  const endpoint404 = 'http://localhost/404'
  const url404 = endpoint404 + apiPath
  const endpoint500 = 'http://localhost/500'
  const url500 = endpoint500 + apiPath
  const endpoint418 = 'http://localhost/418'
  const url418 = endpoint418 + apiPath
  const endpointError = 'http://localhost/error'
  const urlError = endpointError + apiPath
  const body200 = { id: 1 }
  const errorToThrow = new Error('Deliberately thrown error')
  const fetchMock = require('fetch-mock-jest')
  fetchMock
    .post(url200, { body: body200, status: 200 }, { headers })
    .post(url200NoData, { body: {}, status: 200 }, { headers })
    .post(url400, { body: {}, status: 400 }, { headers })
    .post(url401, { body: {}, status: 401 }, { headers })
    .post(url403, { body: {}, status: 403 }, { headers })
    .post(url404, { body: {}, status: 404 }, { headers })
    .post(url500, { body: {}, status: 500 }, { headers })
    .post(url418, { body: {}, status: 418 }, { headers })
    .post(urlError, { throws: errorToThrow }, { headers })
    .put(url200, { body: body200, status: 200 }, { headers })
    .put(url200NoData, { body: {}, status: 200 }, { headers })
    .put(url400, { body: {}, status: 400 }, { headers })
    .put(url401, { body: {}, status: 401 }, { headers })
    .put(url403, { body: {}, status: 403 }, { headers })
    .put(url404, { body: {}, status: 404 }, { headers })
    .put(url500, { body: {}, status: 500 }, { headers })
    .put(url418, { body: {}, status: 418 }, { headers })
    .put(urlError, { throws: errorToThrow }, { headers })
    .patch(url200, { body: body200, status: 200 }, { headers })
    .patch(url200NoData, { body: {}, status: 200 }, { headers })
    .patch(url400, { body: {}, status: 400 }, { headers })
    .patch(url401, { body: {}, status: 401 }, { headers })
    .patch(url403, { body: {}, status: 403 }, { headers })
    .patch(url404, { body: {}, status: 404 }, { headers })
    .patch(url500, { body: {}, status: 500 }, { headers })
    .patch(url418, { body: {}, status: 418 }, { headers })
    .patch(urlError, { throws: errorToThrow }, { headers })

  let hasTimeoutBeenRetrieve: boolean = false
  const timeout_key = 'TIMEOUT_KEY'
  const getTimeout = (key: string) => {
    expect(key).toEqual(timeout_key)
    hasTimeoutBeenRetrieve = true
    return 120
  }
  interface IRequestDto {
    id: number
  }
  interface IRequestModel {
    serverId: number
  }
  interface IResponseDto {
    id: number
  }
  interface IResponseModel {
    id: string
    serverId: number
  }
  const endpointStub = 'http://localhost/stub'
  const stubResponse: IResponseDto = { id: 2 }
  const requestMapper = (model: IRequestModel): IRequestDto => {
    return {
      id: model.serverId,
    }
  }
  const responseMapper = (apiData: IResponseDto): IResponseModel => {
    return {
      id: 'a',
      serverId: apiData.id,
    }
  }
  const requestModel = { serverId: 100 }

  beforeEach(() => {
    hasTimeoutBeenRetrieve = false
  })

  it('should perform a POST call successfully', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint200,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'POST',
      isApiStubbed,
    ).then(data => expect(data).toEqual({ id: 'a', serverId: body200.id }))

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a POST call and return the stub', async () => {
    const isApiStubbed = true

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpointStub,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'POST',
      isApiStubbed,
    ).then(data => expect(data).toEqual({ id: 'a', serverId: stubResponse.id }))

    expect(hasTimeoutBeenRetrieve).toBeFalsy()
  })

  it('should perform a POST call and handle a 400 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint400,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'POST',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({ error: 'api_error_bad_request', status: 400 }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a POST call and handle a 401 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint401,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'POST',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({
        error: 'api_error_permission_denied',
        status: 401,
      }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a POST call and handle a 403 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint403,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'POST',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({
        error: 'api_error_permission_denied',
        status: 403,
      }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a POST call and handle a 404 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint404,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'POST',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({ error: 'api_error_not_found', status: 404 }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a POST call and handle a 500 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint500,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'POST',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({ error: 'api_error_server_error', status: 500 }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a POST call and handle a 418 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint418,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'POST',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({
        error: 'api_error_unspecified_error',
        status: 418,
      }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a PUT call successfully', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint200,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PUT',
      isApiStubbed,
    ).then(data => expect(data).toEqual({ id: 'a', serverId: body200.id }))

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a PUT call and return the stub', async () => {
    const isApiStubbed = true

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpointStub,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PUT',
      isApiStubbed,
    ).then(data => expect(data).toEqual({ id: 'a', serverId: stubResponse.id }))

    expect(hasTimeoutBeenRetrieve).toBeFalsy()
  })

  it('should perform a PUT call and handle a 400 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint400,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PUT',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({ error: 'api_error_bad_request', status: 400 }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a PUT call and handle a 401 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint401,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PUT',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({
        error: 'api_error_permission_denied',
        status: 401,
      }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a PUT call and handle a 403 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint403,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PUT',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({
        error: 'api_error_permission_denied',
        status: 403,
      }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a PUT call and handle a 404 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint404,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PUT',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({ error: 'api_error_not_found', status: 404 }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a PUT call and handle a 500 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint500,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PUT',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({ error: 'api_error_server_error', status: 500 }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a PUT call and handle a 418 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint418,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PUT',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({
        error: 'api_error_unspecified_error',
        status: 418,
      }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a PATCH call successfully', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint200,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PATCH',
      isApiStubbed,
    ).then(data => expect(data).toEqual({ id: 'a', serverId: body200.id }))

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a PATCH call and return the stub', async () => {
    const isApiStubbed = true

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpointStub,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PATCH',
      isApiStubbed,
    ).then(data => expect(data).toEqual({ id: 'a', serverId: stubResponse.id }))

    expect(hasTimeoutBeenRetrieve).toBeFalsy()
  })

  it('should perform a PATCH call and handle a 400 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint400,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PATCH',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({ error: 'api_error_bad_request', status: 400 }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a PATCH call and handle a 401 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint401,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PATCH',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({
        error: 'api_error_permission_denied',
        status: 401,
      }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a PATCH call and handle a 403 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint403,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PATCH',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({
        error: 'api_error_permission_denied',
        status: 403,
      }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a PATCH call and handle a 404 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint404,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PATCH',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({ error: 'api_error_not_found', status: 404 }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a PATCH call and handle a 500 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint500,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PATCH',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({ error: 'api_error_server_error', status: 500 }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })

  it('should perform a PATCH call and handle a 418 error', async () => {
    const isApiStubbed = false

    await apiUpdate<IRequestModel, IRequestDto, IResponseDto, IResponseModel>(
      endpoint418,
      apiKey,
      accessToken,
      getTimeout,
      timeout_key,
      apiPath,
      stubResponse,
      requestMapper,
      responseMapper,
      requestModel,
      'PATCH',
      isApiStubbed,
    ).catch(error =>
      expect(error).toEqual({
        error: 'api_error_unspecified_error',
        status: 418,
      }),
    )

    expect(hasTimeoutBeenRetrieve).toBeTruthy()
  })
})
