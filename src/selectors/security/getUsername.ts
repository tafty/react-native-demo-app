import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'

const _getUsername = (state: ApplicationState) => {
  return state.security.username
}

export const getUsername = createSelector(
  [_getUsername],
  (username: string | undefined) => {
    return username
  },
)
