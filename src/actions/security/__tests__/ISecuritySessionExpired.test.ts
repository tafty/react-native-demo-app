import { SecurityActionType } from '../securityActionType'
import { createAction } from '../../createAction'
import ResponseError from '../../../models/internal/responseError'

describe('ISecuritySessionExpired', () => {
  it('should return a Security Session Expired action', () => {
    const type: SecurityActionType = 'SecuritySessionExpired'
    const error = ResponseError.createResponseError(500, 'timeout')
    const expected = {
      type,
      error,
    }
    const action = createAction(type, { error })
    expect(action).toEqual(expected)
  })
})
