import { IRealmAction } from './IRealmAction'

export interface IDatabaseLoadingDataCompleted extends IRealmAction {
  type: 'DatabaseLoadingDataCompleted'
}
