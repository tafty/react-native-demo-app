import { RealmActionType } from '../realmActionType'
import { createAction } from '../../createAction'

describe('IDatabaseLoadingData', () => {
  it('should return a Database Loading Data action', () => {
    const type: RealmActionType = 'DatabaseLoadingData'
    const expected = {
      type,
    }
    const action = createAction(type, {})
    expect(action).toEqual(expected)
  })
})
