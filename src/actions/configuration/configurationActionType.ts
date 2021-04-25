const actionTypes = [
  'ConfigurationLoadFailed',
  'ConfigurationLoadStarted',
  'ConfigurationLoadSucceeded',
] as const

export type ConfigurationActionType = typeof actionTypes[number]
