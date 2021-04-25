import { IAppAction } from './IAppAction'

export interface IAppInitialised extends IAppAction {
  type: 'AppInitialised'
}
