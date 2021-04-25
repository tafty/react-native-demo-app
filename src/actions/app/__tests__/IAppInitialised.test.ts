import { AppActionType } from '../appActionType'
import { createAction } from '../../createAction'

describe('AppInitialised', () => {
  it('should return an app initialised action', () => {
    const type: AppActionType = 'AppInitialised'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
