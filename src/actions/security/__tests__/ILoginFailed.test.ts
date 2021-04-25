import { SecurityActionType } from '../securityActionType'
import { createAction } from '../../createAction'
import ResponseError from '../../../models/internal/responseError'

describe('ILoginFailed', () => {
  it('should return a Login Failed action', () => {
    const type: SecurityActionType = 'LoginFailed'
    const error = ResponseError.createResponseError(500, 'server error')
    const expected = {
      type,
      error,
    }
    const action = createAction(type, { error })
    expect(action).toEqual(expected)
  })
})
