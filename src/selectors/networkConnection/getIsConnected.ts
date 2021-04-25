import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'

const _getIsConnected = (state: ApplicationState) =>
  state.networkConnection.isConnected

export const getIsConnected = createSelector(
  [_getIsConnected],
  (isConnected: boolean) => {
    return isConnected
  },
)
