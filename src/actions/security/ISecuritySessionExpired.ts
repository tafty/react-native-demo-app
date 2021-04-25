import { ISecurityAction } from './ISecurityAction'
import ResponseError from '../../models/internal/responseError'

export interface ISecuritySessionExpired extends ISecurityAction {
  type: 'SecuritySessionExpired'
  error: ResponseError
}
