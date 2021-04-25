import { IRealmAction } from './IRealmAction'

export interface IDatabaseSavingDataCompleted extends IRealmAction {
  type: 'DatabaseSavingDataCompleted'
}
