import { ISecurityAction } from './ISecurityAction'
import ResponseError from '../../models/internal/responseError'

export interface ILoginFailed extends ISecurityAction {
  type: 'LoginFailed'
  error: ResponseError
}
