import { createSelector } from 'reselect'
import { getRemoteConfig } from './getRemoteConfig'
import type { ApplicationState } from '../../reducers'

const _getApiUri = (state: ApplicationState) => getRemoteConfig(state).api.uri

export const getApiUri = createSelector([_getApiUri], (apiUri: string) => {
  return apiUri
})
