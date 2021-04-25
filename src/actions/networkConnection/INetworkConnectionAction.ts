import { IAction } from '../IAction'
import { NetworkConnectionActionType } from './networkConnectionActionType'

export interface INetworkConnectionAction extends IAction {
  type: NetworkConnectionActionType
}
