import { SecurityActionType } from '../securityActionType'
import { createAction } from '../../createAction'

describe('IRequireLogin', () => {
  it('should return a Log Out Started action', () => {
    const type: SecurityActionType = 'RequireLogin'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
