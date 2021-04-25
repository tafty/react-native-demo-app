import { createSelector } from 'reselect'

import { getEnvironment } from '../configuration/getEnvironment'

export const getRealmPath = createSelector(
  [getEnvironment],
  (environment: string) => {
    return `${environment}.realm`
  },
)
