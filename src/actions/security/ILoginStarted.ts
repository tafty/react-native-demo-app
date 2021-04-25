import { ISecurityAction } from './ISecurityAction'

export interface ILoginStarted extends ISecurityAction {
  type: 'LoginStarted'
  username: string
  password: string
}
