import { RealmActionType } from '../realmActionType'
import { createAction } from '../../createAction'

describe('IDatabaseSavingData', () => {
  it('should return a Database Saving Data action', () => {
    const type: RealmActionType = 'DatabaseSavingData'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
