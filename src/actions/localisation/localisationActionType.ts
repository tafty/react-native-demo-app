const actionTypes = ['LocalisationChanged'] as const

export type LocalisationActionType = typeof actionTypes[number]
