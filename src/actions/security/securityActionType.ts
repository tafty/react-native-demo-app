const actionTypes = [
  'LoginFailed',
  'LoginStarted',
  'LoginSucceeded',
  'LogOutCompleted',
  'LogOutStarted',
  'RequireLogin',
  'SecuritySessionExpired',
  'SecuritySessionLoadCompleted',
] as const

export type SecurityActionType = typeof actionTypes[number]
