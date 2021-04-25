import { createSelector } from 'reselect'
import { getLocalConfig } from './getLocalConfig'
import type { ApplicationState } from '../../reducers'

const _getIsRemoteConfigEnabled = (state: ApplicationState) =>
  getLocalConfig(state).api.isRemoteConfigEnabled

export const getIsRemoteConfigEnabled = createSelector(
  [_getIsRemoteConfigEnabled],
  (isRemoteConfigEnabled: boolean) => {
    return isRemoteConfigEnabled
  },
)
