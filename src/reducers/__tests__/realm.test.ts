import Realm from 'realm'
import realm from '../realm'
import { createAction } from '../../actions/createAction'

describe('realm reducer', () => {
  const initialState = {
    databaseLoaded: false,
    savingData: false,
    loadingData: false,
    migratingDatabase: false,
    closingDatabase: false,
    path: '',
  }

  it('should have an initial state', () => {
    expect(realm()).toEqual(initialState)
  })

  it('should update the realm path when changed', () => {
    const realmHolder = { realm: new Realm() }
    const action = createAction('DatabaseOpened', { realmHolder })

    expect(realm(undefined, action)).toEqual({
      ...initialState,
      path: realmHolder.realm.path,
      databaseLoaded: true,
    })
  })

  it('should show database is being migrated', () => {
    const action = createAction('DatabaseMigrationStarted', {})
    expect(realm(undefined, action)).toEqual({
      ...initialState,
      migratingDatabase: true,
    })

    const action2 = createAction('DatabaseMigrationCompleted', {})
    expect(
      realm(
        {
          ...initialState,
          migratingDatabase: true,
        },
        action2,
      ),
    ).toEqual({
      ...initialState,
    })
  })

  it('should show database loading Data', () => {
    const action = createAction('DatabaseLoadingData', {})
    expect(realm(undefined, action)).toEqual({
      ...initialState,
      loadingData: true,
    })

    const action2 = createAction('DatabaseLoadingDataCompleted', {})
    expect(
      realm(
        {
          ...initialState,
          loadingData: true,
        },
        action2,
      ),
    ).toEqual({
      ...initialState,
    })
  })

  it('should show database saving Data', () => {
    const action = createAction('DatabaseSavingData', {})
    expect(realm(undefined, action)).toEqual({
      ...initialState,
      savingData: true,
    })

    const action2 = createAction('DatabaseSavingDataCompleted', {})
    expect(
      realm(
        {
          ...initialState,
          savingData: true,
        },
        action2,
      ),
    ).toEqual({
      ...initialState,
    })
  })

  it('should show the database is closing', () => {
    const action = createAction('DatabaseClosing', {})
    expect(realm(undefined, action)).toEqual({
      ...initialState,
      closingDatabase: true,
    })

    const action2 = createAction('DatabaseClosed', {})
    expect(
      realm(
        {
          ...initialState,
          closingDatabase: true,
        },
        action2,
      ),
    ).toEqual({
      ...initialState,
    })
  })
})
