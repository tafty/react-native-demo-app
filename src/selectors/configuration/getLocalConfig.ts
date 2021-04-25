import { createSelector } from 'reselect'
import type { ApplicationState } from '../../reducers'
import type { LocalConfig } from '../../config/localConfig'

const _getLocalConfig = (state: ApplicationState) =>
  state.configuration.localConfig

export const getLocalConfig = createSelector(
  [_getLocalConfig],
  (localConfig: LocalConfig) => {
    return localConfig
  },
)
