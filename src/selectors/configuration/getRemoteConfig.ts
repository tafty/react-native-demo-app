import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'

const _getRemoteConfig = (state: ApplicationState) =>
  state.configuration.remoteConfig

export const getRemoteConfig = createSelector(
  [_getRemoteConfig],
  remoteConfig => {
    return remoteConfig
  },
)
