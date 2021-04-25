import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'

const _getHasRemoteConfigLoadSucceeded = (state: ApplicationState) => {
  return state.configuration.hasRemoteConfigLoadSucceeded
}

export const getHasRemoteConfigLoadSucceeded = createSelector(
  [_getHasRemoteConfigLoadSucceeded],
  (hasRemoteConfigLoadSucceeded: boolean | undefined) => {
    return hasRemoteConfigLoadSucceeded
  },
)
