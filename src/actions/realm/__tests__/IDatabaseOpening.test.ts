import { RealmActionType } from '../realmActionType'
import { createAction } from '../../createAction'

describe('IDatabaseOpening', () => {
  it('should return a database opening action', () => {
    const type: RealmActionType = 'DatabaseOpening'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
