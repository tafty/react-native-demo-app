import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'

const _getIsLoginRequired = (state: ApplicationState) =>
  state.security.isLoginRequired

export const getIsLoginRequired = createSelector(
  [_getIsLoginRequired],
  (isLoginRequired: boolean) => {
    return isLoginRequired
  },
)
