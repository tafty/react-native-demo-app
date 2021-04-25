import statusToApiError from '../statusToApiError'

describe('statusToApiError', () => {
  it("should convert 400 to 'api_error_bad_request'", () => {
    const status = 400
    const error = statusToApiError(status)
    expect(error).toEqual('api_error_bad_request')
  })

  it("should convert 401 to 'api_error_permission_denied'", () => {
    const status = 401
    const error = statusToApiError(status)
    expect(error).toEqual('api_error_permission_denied')
  })

  it("should convert 403 to 'api_error_permission_denied'", () => {
    const status = 403
    const error = statusToApiError(status)
    expect(error).toEqual('api_error_permission_denied')
  })

  it("should convert 404 to 'api_error_not_found'", () => {
    const status = 404
    const error = statusToApiError(status)
    expect(error).toEqual('api_error_not_found')
  })

  it("should convert 500 to 'api_error_server_error'", () => {
    const status = 500
    const error = statusToApiError(status)
    expect(error).toEqual('api_error_server_error')
  })

  it("should convert an unrecognised status to 'api_error_unspecified_error'", () => {
    const status = 999
    const error = statusToApiError(status)
    expect(error).toEqual('api_error_unspecified_error')
  })
})
