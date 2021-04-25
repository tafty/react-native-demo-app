import { IRealmAction } from './IRealmAction'

export interface IDatabaseMigrationCompleted extends IRealmAction {
  type: 'DatabaseMigrationCompleted'
}
