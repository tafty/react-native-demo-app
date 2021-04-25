import fetchWithTimeout from '../fetchWithTimeout'

describe('fetchWithTimeout', () => {
  const url200 = 'http://localhost/200'
  const urlError = 'http://localhost/error'
  const urlTimeout = 'http://localhost/timeout'
  const errorToThrow = new Error('A problem occurred')
  const fetchMock = require('fetch-mock-jest')
  fetchMock
    .get(url200, 200)
    .get(urlError, { throws: errorToThrow })
    .mock(
      urlTimeout,
      () => {
        jest.runAllTimers()
      },
      200,
    )

  it('should fetch using the supplied endpoint and options', async () => {
    const optionsParam = {
      method: 'GET',
    }
    const timeout = 120000
    const status = 200

    let isResolveCalled = false
    let isRejectCalled = false

    await fetchWithTimeout(url200, optionsParam, timeout)
      .then(response => {
        isResolveCalled = true
        expect(response.status).toEqual(status)
      })
      .catch(error => {
        console.error(error)
        isRejectCalled = true
      })

    expect(isResolveCalled).toBeTruthy()
    expect(isRejectCalled).toBeFalsy()
  })

  it('should set the timeout with the supplied value and clear the timer when Promise is resolved', async () => {
    jest.useFakeTimers()

    const optionsParam = {
      method: 'GET',
    }
    const timeout = 120000
    const status = 200

    let isResolveCalled = false
    let isRejectCalled = false

    await fetchWithTimeout(url200, optionsParam, timeout)
      .then(response => {
        isResolveCalled = true
        expect(response.status).toEqual(status)
      })
      .catch(error => {
        console.error(error)
        isRejectCalled = true
      })

    expect(clearTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout)

    expect(isResolveCalled).toBeTruthy()
    expect(isRejectCalled).toBeFalsy()
  })

  it('should clear the timer if Promise is rejected', async () => {
    jest.useFakeTimers()

    const optionsParam = {
      method: 'GET',
    }
    const timeout = 120000

    let isResolveCalled = false
    let isRejectCalled = false

    await fetchWithTimeout(urlError, optionsParam, timeout)
      .then(response => {
        console.log(response)
        isResolveCalled = true
      })
      .catch(error => {
        isRejectCalled = true
        expect(error).toEqual(errorToThrow)
      })

    expect(clearTimeout).toHaveBeenCalledTimes(1)

    expect(isResolveCalled).toBeFalsy()
    expect(isRejectCalled).toBeTruthy()
  })

  it('should call reject if the supplied timeout is exceeded', async () => {
    jest.useFakeTimers()

    const optionsParam = {
      method: 'GET',
    }
    const timeout = 120000

    let isResolveCalled = false
    let isRejectCalled = false

    await fetchWithTimeout(urlTimeout, optionsParam, timeout)
      .then(response => {
        console.log(response)
        isResolveCalled = true
      })
      .catch(error => {
        expect(error).toEqual('Request timed out')
        isRejectCalled = true
      })

    expect(isResolveCalled).toBeFalsy()
    expect(isRejectCalled).toBeTruthy()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout)
  })
})
