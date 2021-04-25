import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'

const _getIsAppActive = (state: ApplicationState) => state.app.isActive

export const getIsAppActive = createSelector(
  [_getIsAppActive],
  (isActive: boolean) => {
    return isActive
  },
)
