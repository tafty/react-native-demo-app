import { createSelector } from 'reselect'

import type { ApplicationState } from '../../reducers'

const _getSecurityError = (state: ApplicationState) => {
  return state.security.error
}

export const getSecurityError = createSelector([_getSecurityError], error => {
  return error
})
