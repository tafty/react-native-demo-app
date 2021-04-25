import ResponseError from '../responseError'

describe('ResponseError', () => {
  it('should initialise with the supplied data', () => {
    const message = 'server error'
    const status = 500

    let responseError = ResponseError.createResponseError(status, message)

    expect(responseError.message).toEqual(message)
    expect(responseError.status).toEqual(status)
  })
})
