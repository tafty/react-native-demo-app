import { createSelector } from 'reselect'
import { getLocalConfig } from './getLocalConfig'
import type { ApplicationState } from '../../reducers'

const _getRemoteConfigUri = (state: ApplicationState) =>
  getLocalConfig(state).api.remoteConfigUri

export const getRemoteConfigUri = createSelector(
  [_getRemoteConfigUri],
  (configApiUri: string) => {
    return configApiUri
  },
)
