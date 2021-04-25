import * as R from 'ramda'

import type { Action } from '../actions'
import { IConfigurationLoadSucceeded } from '../actions/configuration/IConfigurationLoadSucceeded'
import { LocalConfig } from '../config/localConfig'
import { RemoteConfig } from '../config/remoteConfig'

const Config = require('../config/config.json')
const DefaultRemoteConfig = require('../config/defaultRemoteConfig.json')

export type ConfigurationState = {
  hasLoadingRemoteConfigStarted: boolean
  hasRemoteConfigLoadSucceeded: boolean | undefined
  isLoadingRemoteConfig: boolean
  localConfig: LocalConfig
  remoteConfig: RemoteConfig
}

const initialState = {
  hasLoadingRemoteConfigStarted: false,
  hasRemoteConfigLoadSucceeded: undefined,
  isLoadingRemoteConfig: false,
  localConfig: Config,
  remoteConfig: DefaultRemoteConfig,
}

export default function configuration(
  state: ConfigurationState = initialState,
  action?: Action,
): ConfigurationState {
  if (R.isNil(action) || R.isNil(action.type)) {
    //  state cannot be null as a default is provided
    return state
  }

  switch (action.type) {
    case 'ConfigurationLoadStarted': {
      return (state = {
        ...state,
        hasLoadingRemoteConfigStarted: true,
        isLoadingRemoteConfig: true,
      })
    }
    case 'ConfigurationLoadSucceeded':
      return hasRemoteConfigLoadSucceeded(state, action)
    case 'ConfigurationLoadFailed': {
      return (state = {
        ...state,
        isLoadingRemoteConfig: false,
        hasRemoteConfigLoadSucceeded: false,
      })
    }
    default:
      return state
  }
}

function hasRemoteConfigLoadSucceeded(
  state: ConfigurationState,
  action: IConfigurationLoadSucceeded,
): ConfigurationState {
  return (state = {
    ...state,
    isLoadingRemoteConfig: false,
    hasRemoteConfigLoadSucceeded: true,
    remoteConfig: action.config,
  })
}
