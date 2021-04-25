import { IAction } from '../IAction'
import { LocalisationActionType } from './localisationActionType'

export interface ILocalisationAction extends IAction {
  type: LocalisationActionType
}
