import { createSelector } from 'reselect'
import { getRemoteConfig } from '../configuration/getRemoteConfig'
import type { ApplicationState } from '../../reducers'

const _getHasEnforcedLoginOnForeground = (state: ApplicationState) =>
  getRemoteConfig(state).security.hasEnforcedLoginOnForeground

export const getHasEnforcedLoginOnForeground = createSelector(
  [_getHasEnforcedLoginOnForeground],
  (hasEnforcedLoginOnForeground: boolean) => {
    return hasEnforcedLoginOnForeground
  },
)
