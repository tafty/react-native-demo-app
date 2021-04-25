import { createSelector } from 'reselect'
import { getLocalConfig } from './getLocalConfig'
import type { ApplicationState } from '../../reducers'

const getApiKeySelector = (state: ApplicationState) =>
  getLocalConfig(state).api.key

export const getApiKey = createSelector(
  [getApiKeySelector],
  (apiKey: string) => {
    return apiKey
  },
)
