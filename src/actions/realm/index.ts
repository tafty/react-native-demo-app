export * from './IDatabaseOpened'

export * from './realmActionType'

import { IDatabaseClosed } from './IDatabaseClosed'
import { IDatabaseClosing } from './IDatabaseClosing'
import { IDatabaseLoadingData } from './IDatabaseLoadingData'
import { IDatabaseLoadingDataCompleted } from './IDatabaseLoadingDataCompleted'
import { IDatabaseMigrationCompleted } from './IDatabaseMigrationCompleted'
import { IDatabaseMigrationStarted } from './IDatabaseMigrationStarted'
import { IDatabaseOpened } from './IDatabaseOpened'
import { IDatabaseOpening } from './IDatabaseOpening'
import { IDatabaseSavingData } from './IDatabaseSavingData'
import { IDatabaseSavingDataCompleted } from './IDatabaseSavingDataCompleted'

export type Action =
  | IDatabaseClosed
  | IDatabaseClosing
  | IDatabaseLoadingData
  | IDatabaseLoadingDataCompleted
  | IDatabaseMigrationCompleted
  | IDatabaseMigrationStarted
  | IDatabaseOpened
  | IDatabaseOpening
  | IDatabaseSavingData
  | IDatabaseSavingDataCompleted
