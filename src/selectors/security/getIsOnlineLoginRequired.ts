import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'

const _getIsOnlineLoginRequired = (state: ApplicationState) =>
  state.security.isOnlineLoginRequired

export const getIsOnlineLoginRequired = createSelector(
  [_getIsOnlineLoginRequired],
  (isOnlineLoginRequired: boolean) => {
    return isOnlineLoginRequired
  },
)
