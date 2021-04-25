import { SecurityActionType } from '../securityActionType'
import { createAction } from '../../createAction'

describe('ISecuritySessionLoadCompleted', () => {
  it('should return a Security Session Load Completed action', () => {
    const type: SecurityActionType = 'SecuritySessionLoadCompleted'
    const username = 'bob'
    const expected = {
      type,
      username,
    }
    const action = createAction(type, { username })
    expect(action).toEqual(expected)
  })
})
