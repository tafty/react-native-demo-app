import { createSelector } from 'reselect'
import { getLocalConfig } from '../configuration/getLocalConfig'
import type { ApplicationState } from '../../reducers'

const getIsRealmEncryptedSelector = (state: ApplicationState) =>
  getLocalConfig(state).realm.encrypted

export const getIsRealmEncrypted = createSelector(
  [getIsRealmEncryptedSelector],
  (isEncrypted: boolean) => {
    return isEncrypted
  },
)
