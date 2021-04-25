import { IRealmAction } from './IRealmAction'

export interface IDatabaseClosed extends IRealmAction {
  type: 'DatabaseClosed'
}
