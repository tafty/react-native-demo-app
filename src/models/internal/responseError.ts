export default class ResponseError {
  message: string
  status: number

  constructor(status: number, message: string) {
    this.message = message
    this.status = status
  }

  static createResponseError(status: number, message: string) {
    const responseError = new ResponseError(status, message)
    return responseError
  }
}
