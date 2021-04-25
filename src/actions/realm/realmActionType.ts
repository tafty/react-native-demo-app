const actionTypes = [
  'DatabaseOpening',
  'DatabaseOpened',
  'DatabaseSavingData',
  'DatabaseSavingDataCompleted',
  'DatabaseMigrationStarted',
  'DatabaseMigrationCompleted',
  'DatabaseLoadingData',
  'DatabaseLoadingDataCompleted',
  'DatabaseClosing',
  'DatabaseClosed',
] as const

export type RealmActionType = typeof actionTypes[number]
