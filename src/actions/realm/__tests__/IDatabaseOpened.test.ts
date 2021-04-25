import Realm from 'realm'

import { RealmActionType } from '../realmActionType'
import { createAction } from '../../createAction'

describe('IDatabaseOpened', () => {
  it('should return a database opened action', () => {
    const type: RealmActionType = 'DatabaseOpened'
    const realmHolder = { realm: new Realm() }
    const expected = {
      type,
      realmHolder,
    }
    const action = createAction(type, { realmHolder })
    expect(action).toEqual(expected)
  })
})
