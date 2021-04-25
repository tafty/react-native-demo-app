import { AppActionType } from '../appActionType'
import { createAction } from '../../createAction'

describe('AppActive', () => {
  it('should return an app active action', () => {
    const type: AppActionType = 'AppActive'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
