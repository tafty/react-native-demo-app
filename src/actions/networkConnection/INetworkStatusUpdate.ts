import { INetworkConnectionAction } from './INetworkConnectionAction'

export interface INetworkStatusUpdate extends INetworkConnectionAction {
  type: 'NetworkStatusUpdate'
  payload: {
    isConnected: boolean
    isInternetReachable: boolean
    type?: string
  }
}
