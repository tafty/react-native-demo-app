import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'

const _getIsLoggedIn = (state: ApplicationState) => state.security.isLoggedIn

export const getIsLoggedIn = createSelector(
  [_getIsLoggedIn],
  (isLoggedIn: boolean) => {
    return isLoggedIn
  },
)
