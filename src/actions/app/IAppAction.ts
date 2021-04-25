import { IAction } from '../IAction'
import { AppActionType } from './appActionType'

export interface IAppAction extends IAction {
  type: AppActionType
}
