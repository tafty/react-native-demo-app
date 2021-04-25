import { IAction } from '../IAction'
import { SecurityActionType } from './securityActionType'

export interface ISecurityAction extends IAction {
  type: SecurityActionType
}
