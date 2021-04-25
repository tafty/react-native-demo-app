import { IAction } from '../IAction'
import { RealmActionType } from './realmActionType'

export interface IRealmAction extends IAction {
  type: RealmActionType
}
