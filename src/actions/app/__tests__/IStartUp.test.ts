import { AppActionType } from '../appActionType'
import { createAction } from '../../createAction'

describe('StartUp', () => {
  it('should return a start up action', () => {
    const type: AppActionType = 'StartUp'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
