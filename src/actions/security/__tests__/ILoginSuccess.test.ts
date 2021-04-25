import { SecurityActionType } from '../securityActionType'
import { createAction } from '../../createAction'

describe('ILoginSucceeded', () => {
  it('should return a Login Started action', () => {
    const type: SecurityActionType = 'LoginSucceeded'
    const username = 'bob'
    const isOnlineLoginRequired = true
    const expected = {
      type,
      username,
      isOnlineLoginRequired,
    }
    const action = createAction(type, { username, isOnlineLoginRequired })
    expect(action).toEqual(expected)
  })
})
