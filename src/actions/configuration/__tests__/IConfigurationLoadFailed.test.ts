import { ConfigurationActionType } from '../configurationActionType'
import { createAction } from '../../createAction'

describe('IConfigurationLoadFailed', () => {
  it('should return a configuration load failed action', () => {
    const type: ConfigurationActionType = 'ConfigurationLoadFailed'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
