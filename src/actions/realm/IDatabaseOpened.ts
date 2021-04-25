import { RealmHolder } from '../../database'
import { IRealmAction } from './IRealmAction'

export interface IDatabaseOpened extends IRealmAction {
  type: 'DatabaseOpened'
  realmHolder: RealmHolder
}
