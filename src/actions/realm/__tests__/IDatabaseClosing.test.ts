import { RealmActionType } from '../realmActionType'
import { createAction } from '../../createAction'

describe('IDatabaseClosing', () => {
  it('should return a database closing action', () => {
    const type: RealmActionType = 'DatabaseClosing'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
