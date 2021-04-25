import { IAction } from '../IAction'
import { ConfigurationActionType } from './configurationActionType'

export interface IConfigurationAction extends IAction {
  type: ConfigurationActionType
}
