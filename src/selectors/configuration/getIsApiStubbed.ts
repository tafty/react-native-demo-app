import { createSelector } from 'reselect'
import { getEnvironment } from './getEnvironment'
import { getLocalConfig } from './getLocalConfig'
import type { ApplicationState } from '../../reducers'

const _getIsApiStubbed = (state: ApplicationState) =>
  getLocalConfig(state).api.isStubbed

export const getIsApiStubbed = createSelector(
  [_getIsApiStubbed, getEnvironment],
  (isApiStubbed: boolean, environment: string) => {
    return isApiStubbed && environment !== 'production'
  },
)
