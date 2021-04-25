import * as R from 'ramda'
const memoize = require('lodash.memoize')
import { createSelector } from 'reselect'
import { getRemoteConfig } from './getRemoteConfig'
import type { RemoteConfigApiTimeout } from '../../config/remoteConfig'
import type { ApplicationState } from '../../reducers'

const getTimeouts = (state: ApplicationState) =>
  getRemoteConfig(state).api.timeoutsInSeconds

export const getApiCallTimeoutInMilliseconds = createSelector(
  [getTimeouts],
  (timeouts: Array<RemoteConfigApiTimeout>) => {
    return memoize((key: string) => {
      const result = timeouts.filter((timeout: RemoteConfigApiTimeout) => {
        return timeout.key.toLowerCase() === key.toLowerCase()
      })

      if (R.isNil(result) || result.length === 0) {
        const defaultTimeout = timeouts.filter(
          (timeout: RemoteConfigApiTimeout) => {
            return timeout.key.toLowerCase() === 'default'
          },
        )
        if (R.isNil(defaultTimeout) || defaultTimeout.length === 0) {
          return undefined
        }

        return defaultTimeout[0].value * 1000
      }

      return result[0].value * 1000
    })
  },
)
