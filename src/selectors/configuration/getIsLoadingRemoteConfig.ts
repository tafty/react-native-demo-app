import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'

const loadingRemoteConfig = (state: ApplicationState) =>
  state.configuration.isLoadingRemoteConfig

export const getIsLoadingRemoteConfig = createSelector(
  [loadingRemoteConfig],
  (isLoadingRemoteConfig: boolean) => {
    return isLoadingRemoteConfig
  },
)
