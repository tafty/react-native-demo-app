import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'

const _getCurrentLocale = (state: ApplicationState) => state.localisation.locale

export const getCurrentLocale = createSelector(
  [_getCurrentLocale],
  (locale: string | undefined) => {
    return locale
  },
)
