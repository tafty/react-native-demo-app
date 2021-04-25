import { RealmActionType } from '../realmActionType'
import { createAction } from '../../createAction'

describe('IDatabaseLoadingDataCompleted', () => {
  it('should return a Database Loading Data Completed action', () => {
    const type: RealmActionType = 'DatabaseLoadingDataCompleted'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
