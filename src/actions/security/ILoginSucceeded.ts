import { ISecurityAction } from './ISecurityAction'

export interface ILoginSucceeded extends ISecurityAction {
  type: 'LoginSucceeded'
  username: string
  isOnlineLoginRequired: boolean
}
