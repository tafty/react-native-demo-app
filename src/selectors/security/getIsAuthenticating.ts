import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'

const _getIsAuthenticating = (state: ApplicationState) =>
  state.security.isAuthenticating

export const getIsAuthenticating = createSelector(
  [_getIsAuthenticating],
  (isAuthenticating: boolean) => {
    return isAuthenticating
  },
)
