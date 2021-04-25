import { ISecurityAction } from './ISecurityAction'

export interface ILogOutStarted extends ISecurityAction {
  type: 'LogOutStarted'
}
