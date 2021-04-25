import { createSelector } from 'reselect'
import { getLocalConfig } from './getLocalConfig'
import type { ApplicationState } from '../../reducers'

const _getEnvironment = (state: ApplicationState) =>
  getLocalConfig(state).environment

export const getEnvironment = createSelector(
  [_getEnvironment],
  (environment: string) => {
    return environment
  },
)
