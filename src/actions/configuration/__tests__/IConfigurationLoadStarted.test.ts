import { ConfigurationActionType } from '../configurationActionType'
import { createAction } from '../../createAction'

describe('IConfigurationLoadStarted', () => {
  it('should return a configuration load started action', () => {
    const type: ConfigurationActionType = 'ConfigurationLoadStarted'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
