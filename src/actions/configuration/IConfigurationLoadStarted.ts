import { IConfigurationAction } from './IConfigurationAction'

export interface IConfigurationLoadStarted extends IConfigurationAction {
  type: 'ConfigurationLoadStarted'
}
