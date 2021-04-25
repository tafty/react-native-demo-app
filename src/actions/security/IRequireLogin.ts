import { ISecurityAction } from './ISecurityAction'

export interface IRequireLogin extends ISecurityAction {
  type: 'RequireLogin'
}
