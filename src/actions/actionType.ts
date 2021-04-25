import { AppActionType } from './app'
import { ConfigurationActionType } from './configuration'
import { LocalisationActionType } from './localisation'
import { NetworkConnectionActionType } from './networkConnection'
import { RealmActionType } from './realm'
import { SecurityActionType } from './security'

export type ActionType =
  | AppActionType
  | ConfigurationActionType
  | LocalisationActionType
  | NetworkConnectionActionType
  | RealmActionType
  | SecurityActionType
