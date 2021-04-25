const statusToApiError = (status: number) => {
  // Explicitly handle HTTP codes that are known to be returned from the service
  switch (status) {
    case 400:
      return 'api_error_bad_request'
    case 401:
    case 403:
      return 'api_error_permission_denied'
    case 404:
      return 'api_error_not_found'
    case 500:
      return 'api_error_server_error'
    default:
      return 'api_error_unspecified_error'
  }
}

export default statusToApiError
