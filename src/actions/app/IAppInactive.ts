import { IAppAction } from './IAppAction'

export interface IAppInactive extends IAppAction {
  type: 'AppInactive'
}
