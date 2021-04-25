import { SecurityActionType } from '../securityActionType'
import { createAction } from '../../createAction'

describe('ILogOutStarted', () => {
  it('should return a Log Out Started action', () => {
    const type: SecurityActionType = 'LogOutStarted'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
