export * from './IConfigurationAction'
export * from './IConfigurationLoadStarted'
export * from './IConfigurationLoadSucceeded'

export * from './configurationActionType'

import { IConfigurationLoadFailed } from './IConfigurationLoadFailed'
import { IConfigurationLoadStarted } from './IConfigurationLoadStarted'
import { IConfigurationLoadSucceeded } from './IConfigurationLoadSucceeded'

export type Action =
  | IConfigurationLoadFailed
  | IConfigurationLoadStarted
  | IConfigurationLoadSucceeded
