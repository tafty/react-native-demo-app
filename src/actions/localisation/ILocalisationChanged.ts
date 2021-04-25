import { ILocalisationAction } from './ILocalisationAction'

export interface ILocalisationChanged extends ILocalisationAction {
  type: 'LocalisationChanged'
  locale: string
}
