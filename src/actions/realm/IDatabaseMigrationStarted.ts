import { IRealmAction } from './IRealmAction'

export interface IDatabaseMigrationStarted extends IRealmAction {
  type: 'DatabaseMigrationStarted'
}
