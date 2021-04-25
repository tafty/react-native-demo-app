import { RealmActionType } from '../realmActionType'
import { createAction } from '../../createAction'

describe('IDatabaseMigrationStarted', () => {
  it('should return a Database Migration Started action', () => {
    const type: RealmActionType = 'DatabaseMigrationStarted'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
