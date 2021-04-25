import { testSaga } from 'redux-saga-test-plan'

import performFetchRemoteConfig from '../performFetchRemoteConfig'

import { fetchRemoteConfig } from '../../../api/config/remoteConfig'
import { getApiCallTimeoutInMilliseconds } from '../../../selectors/configuration/getApiCallTimeoutInMilliseconds'
import { getApiKey } from '../../../selectors/configuration/getApiKey'
import { getRemoteConfigUri } from '../../../selectors/configuration/getRemoteConfigUri'
import { getIsLoadingRemoteConfig } from '../../../selectors/configuration/getIsLoadingRemoteConfig'
import { getIsRemoteConfigEnabled } from '../../../selectors/configuration/getIsRemoteConfigEnabled'

describe('performFetchRemoteConfig', () => {
  it('should run through the correct steps if configuration is not already loading', () => {
    const remoteConfigApiUri = 'http://localhost/config'
    const apiKey = 'key'
    const getTimeout = () => {
      return 120
    }
    const isRemoteConfigEnabled = true
    const remoteConfigJSON = {
      api: {
        uri: 'https://server/',
      },
    }

    const saga = testSaga(performFetchRemoteConfig)

    saga
      .next()
      .select(getIsLoadingRemoteConfig)
      .next(false)
      .put({ type: 'ConfigurationLoadStarted' })
      .next()
      .select(getRemoteConfigUri)
      .next(remoteConfigApiUri)
      .select(getApiKey)
      .next(apiKey)
      .select(getApiCallTimeoutInMilliseconds)
      .next(getTimeout)
      .select(getIsRemoteConfigEnabled)
      .next(isRemoteConfigEnabled)
      .next({ status: 200, data: remoteConfigJSON })
      .put({
        type: 'ConfigurationLoadSucceeded',
        config: remoteConfigJSON,
      })
      .next()
      .isDone()
  })

  it('should convert a status > 300 into an error', () => {
    const remoteConfigApiUri = 'http://localhost/config'
    const apiKey = 'key'
    const getTimeout = () => {
      return 120
    }
    const isRemoteConfigEnabled = true

    const saga = testSaga(performFetchRemoteConfig)

    saga
      .next()
      .select(getIsLoadingRemoteConfig)
      .next(false)
      .put({ type: 'ConfigurationLoadStarted' })
      .next()
      .select(getRemoteConfigUri)
      .next(remoteConfigApiUri)
      .select(getApiKey)
      .next(apiKey)
      .select(getApiCallTimeoutInMilliseconds)
      .next(getTimeout)
      .select(getIsRemoteConfigEnabled)
      .next(isRemoteConfigEnabled)
      .call(
        fetchRemoteConfig,
        remoteConfigApiUri,
        apiKey,
        getTimeout,
        isRemoteConfigEnabled,
      )
      .next({ status: 300 })
      .put({ type: 'ConfigurationLoadFailed' })
      .next()
      .isDone()
  })

  it('should catch any errors thrown', () => {
    const error = new Error('This is forced')

    const saga = testSaga(performFetchRemoteConfig)

    saga
      .next()
      .select(getIsLoadingRemoteConfig)
      .next(false)
      .put({ type: 'ConfigurationLoadStarted' })
      .throw(error)
      .put({ type: 'ConfigurationLoadFailed' })
      .next()
      .isDone()
  })

  it('should do nothing if configuration is already loading', () => {
    const saga = testSaga(performFetchRemoteConfig)

    saga.next().select(getIsLoadingRemoteConfig).next(true).isDone()
  })
})
