import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'

const _getHasAppInitialised = (state: ApplicationState) =>
  state.app.hasAppInitialised

export const getHasAppInitialised = createSelector(
  [_getHasAppInitialised],
  (hasAppInitialised: boolean) => {
    return hasAppInitialised
  },
)
