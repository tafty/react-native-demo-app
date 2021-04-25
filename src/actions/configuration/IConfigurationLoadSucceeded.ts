import { IConfigurationAction } from './IConfigurationAction'
import { RemoteConfig } from '../../config/remoteConfig'

export interface IConfigurationLoadSucceeded extends IConfigurationAction {
  type: 'ConfigurationLoadSucceeded'
  config: RemoteConfig
}
