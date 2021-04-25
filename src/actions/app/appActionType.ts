const actionTypes = [
  'AppActive',
  'AppInactive',
  'AppInitialised',
  'StartUp',
] as const

export type AppActionType = typeof actionTypes[number]
