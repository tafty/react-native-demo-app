import * as R from 'ramda'

import type { Action } from '../actions'
import { INetworkStatusUpdate } from '../actions/networkConnection/INetworkStatusUpdate'

export type NetworkConnectionState = {
  connectionType: string | undefined
  isConnected: boolean
  isInternetReachable: boolean | undefined | null
}

const initialState = {
  isConnected: false,
  isInternetReachable: false,
  connectionType: undefined,
}

const networkConnection = (
  state: NetworkConnectionState = initialState,
  action: Action,
): NetworkConnectionState => {
  if (R.isNil(action) || R.isNil(action.type)) {
    return state
  }

  switch (action.type) {
    case 'NetworkStatusUpdate': {
      return networkStatusUpdated(action)
    }
    default: {
      return state
    }
  }
}

const networkStatusUpdated = (
  action: INetworkStatusUpdate,
): NetworkConnectionState => {
  return {
    isConnected: action.payload.isConnected,
    isInternetReachable: action.payload.isInternetReachable,
    connectionType: action.payload.type,
  }
}

export default networkConnection
