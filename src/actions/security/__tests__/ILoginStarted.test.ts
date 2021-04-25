import { SecurityActionType } from '../securityActionType'
import { createAction } from '../../createAction'

describe('ILoginStarted', () => {
  it('should return a Login Started action', () => {
    const type: SecurityActionType = 'LoginStarted'
    const username = 'bob'
    const password = '1234'
    const expected = {
      type,
      username,
      password,
    }
    const action = createAction(type, { username, password })
    expect(action).toEqual(expected)
  })
})
