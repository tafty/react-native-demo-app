import { IRealmAction } from './IRealmAction'

export interface IDatabaseClosing extends IRealmAction {
  type: 'DatabaseClosing'
}
