import { RealmActionType } from '../realmActionType'
import { createAction } from '../../createAction'

describe('IDatabaseClosed', () => {
  it('should return a database closed action', () => {
    const type: RealmActionType = 'DatabaseClosed'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
