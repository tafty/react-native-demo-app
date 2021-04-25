import { RealmActionType } from '../realmActionType'
import { createAction } from '../../createAction'

describe('IDatabaseMigrationCompleted', () => {
  it('should return a Database Migration Completed action', () => {
    const type: RealmActionType = 'DatabaseMigrationCompleted'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
