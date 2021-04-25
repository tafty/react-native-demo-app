import { IConfigurationAction } from './IConfigurationAction'

export interface IConfigurationLoadFailed extends IConfigurationAction {
  type: 'ConfigurationLoadFailed'
}
