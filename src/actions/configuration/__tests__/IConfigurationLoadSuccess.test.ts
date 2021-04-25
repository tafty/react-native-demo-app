import { ConfigurationActionType } from '../configurationActionType'
import { createAction } from '../../createAction'

describe('IConfigurationLoadSucceeded', () => {
  it('should return a configuration load started action', () => {
    const type: ConfigurationActionType = 'ConfigurationLoadSucceeded'
    const config = {
      api: {
        uri: 'http://localhost:18083/v1',
        timeoutsInSeconds: [
          { key: 'default', value: 120 },
          { key: 'authentication', value: 120 },
          { key: 'configuration', value: 120 },
        ],
      },
      configuration: {},
      security: {
        sessionTimeOutInMinutes: 0,
        hasEnforcedLoginOnForeground: false,
        isOfflineLoginEnabled: false,
      },
    }
    const expected = {
      type,
      config,
    }
    const action = createAction(type, { config })
    expect(action).toEqual(expected)
  })
})
