import { createSelector } from 'reselect'
import { getRemoteConfig } from '../configuration/getRemoteConfig'
import type { ApplicationState } from '../../reducers'

const _getIsOfflineLoginEnabled = (state: ApplicationState) =>
  getRemoteConfig(state).security.isOfflineLoginEnabled

export const getIsOfflineLoginEnabled = createSelector(
  [_getIsOfflineLoginEnabled],
  (isOfflineLoginEnabled: boolean) => {
    return isOfflineLoginEnabled
  },
)
