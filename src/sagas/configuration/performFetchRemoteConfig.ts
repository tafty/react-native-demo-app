import deviceLog from 'react-native-device-log'
import { call, put, select } from 'redux-saga/effects'

import { createAction } from '../../actions/createAction'
import { fetchRemoteConfig } from '../../api/config/remoteConfig'
import { getApiCallTimeoutInMilliseconds } from '../../selectors/configuration/getApiCallTimeoutInMilliseconds'
import { getApiKey } from '../../selectors/configuration/getApiKey'
import { getRemoteConfigUri } from '../../selectors/configuration/getRemoteConfigUri'
import { getIsLoadingRemoteConfig } from '../../selectors/configuration/getIsLoadingRemoteConfig'
import { getIsRemoteConfigEnabled } from '../../selectors/configuration/getIsRemoteConfigEnabled'

export default function* performFetchRemoteConfig(): Generator<any, void, any> {
  const isLoadingRemoteConfig = yield select(getIsLoadingRemoteConfig)

  if (!isLoadingRemoteConfig) {
    try {
      yield put(createAction('ConfigurationLoadStarted', {}))
      const remoteConfigApiUri = yield select(getRemoteConfigUri)
      const apiKey = yield select(getApiKey)
      const getTimeout = yield select(getApiCallTimeoutInMilliseconds)
      const isRemoteConfigEnabled = yield select(getIsRemoteConfigEnabled)

      const response = yield call(
        fetchRemoteConfig,
        remoteConfigApiUri,
        apiKey,
        getTimeout,
        isRemoteConfigEnabled,
      )

      if (response.status < 300) {
        yield put(
          createAction('ConfigurationLoadSucceeded', { config: response.data }),
        )
      } else {
        yield put(createAction('ConfigurationLoadFailed', {}))
      }
    } catch (error) {
      deviceLog.error(error)
      yield put(createAction('ConfigurationLoadFailed', {}))
    }
  }
}
