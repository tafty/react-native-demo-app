import { combineReducers } from 'redux'

import app from './app'
import configuration from './configuration'
import localisation from './localisation'
import networkConnection from './networkConnection'
import realm from './realm'
import security from './security'

import type { AppState } from './app'
import type { ConfigurationState } from './configuration'
import type { LocalisationState } from './localisation'
import type { NetworkConnectionState } from './networkConnection'
import type { RealmState } from './realm'
import type { SecurityState } from './security'

export type ApplicationState = {
  app: AppState
  configuration: ConfigurationState
  localisation: LocalisationState
  networkConnection: NetworkConnectionState
  realm: RealmState
  security: SecurityState
}

export default combineReducers({
  app,
  configuration,
  localisation,
  networkConnection,
  realm,
  security,
})
