export * from './IAppActive'
export * from './IAppInactive'
export * from './IAppInitialised'
export * from './IStartUp'

export * from './appActionType'

import { IAppActive } from './IAppActive'
import { IAppInactive } from './IAppInactive'
import { IAppInitialised } from './IAppInitialised'
import { IStartUp } from './IStartUp'

export type Action = IAppActive | IAppInactive | IAppInitialised | IStartUp
