import { AppActionType } from '../appActionType'
import { createAction } from '../../createAction'

describe('AppInactive', () => {
  it('should return an app inactive action', () => {
    const type: AppActionType = 'AppInactive'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
