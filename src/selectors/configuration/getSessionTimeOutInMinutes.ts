import { createSelector } from 'reselect'
import { getRemoteConfig } from './getRemoteConfig'
import type { ApplicationState } from '../../reducers'

const _getSessionTimeOutInMinutes = (state: ApplicationState) => {
  return getRemoteConfig(state).security.sessionTimeOutInMinutes
}

export const getSessionTimeOutInMinutes = createSelector(
  [_getSessionTimeOutInMinutes],
  (sessionTimeOutInMinutes: number) => {
    return sessionTimeOutInMinutes
  },
)
