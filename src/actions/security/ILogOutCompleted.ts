import { ISecurityAction } from './ISecurityAction'

export interface ILogOutCompleted extends ISecurityAction {
  type: 'LogOutCompleted'
}
