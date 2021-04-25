import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'

const _getConnectionType = (state: ApplicationState) =>
  state.networkConnection.connectionType

export const getConnectionType = createSelector(
  [_getConnectionType],
  (connectionType: string | undefined) => {
    return connectionType
  },
)
