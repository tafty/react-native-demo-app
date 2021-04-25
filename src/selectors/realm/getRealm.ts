import { createSelector } from 'reselect'

import realmHolder from '../../database'

const getRealmSelector = () => realmHolder.realm

export const getRealm = createSelector([getRealmSelector], realm => {
  return realm
})
