const actionTypes = ['NetworkStatusUpdate'] as const

export type NetworkConnectionActionType = typeof actionTypes[number]
