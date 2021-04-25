import { SecurityActionType } from '../securityActionType'
import { createAction } from '../../createAction'

describe('ILogOutd', () => {
  it('should return a Log Out Completed action', () => {
    const type: SecurityActionType = 'LogOutCompleted'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
