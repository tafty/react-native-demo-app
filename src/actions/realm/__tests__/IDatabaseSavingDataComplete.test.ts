import { RealmActionType } from '../realmActionType'
import { createAction } from '../../createAction'

describe('IDatabaseSavingDataCompleted', () => {
  it('should return a Database Saving Data Completed action', () => {
    const type: RealmActionType = 'DatabaseSavingDataCompleted'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
