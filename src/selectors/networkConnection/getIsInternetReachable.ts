import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'

const _getIsInternetReachable = (state: ApplicationState) =>
  state.networkConnection.isInternetReachable

export const getIsInternetReachable = createSelector(
  [_getIsInternetReachable],
  (isInternetReachable: boolean | null | undefined) => {
    return isInternetReachable
  },
)
