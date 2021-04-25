import { ISecurityAction } from './ISecurityAction'

export interface ISecuritySessionLoadCompleted extends ISecurityAction {
  type: 'SecuritySessionLoadCompleted'
  username: string
}
