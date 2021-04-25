import * as R from 'ramda'
import type { Action } from '../actions'
import { IDatabaseOpened } from '../actions/realm/IDatabaseOpened'

export type RealmState = {
  databaseLoaded: boolean
  savingData: boolean
  loadingData: boolean
  migratingDatabase: boolean
  closingDatabase: boolean
  path: string
}

const initialState = {
  databaseLoaded: false,
  savingData: false,
  loadingData: false,
  migratingDatabase: false,
  closingDatabase: false,
  path: '',
}

export default function app(
  state: RealmState = initialState,
  action?: Action,
): RealmState {
  if (R.isNil(action) || R.isNil(action.type)) {
    return state
  }

  switch (action.type) {
    case 'DatabaseOpened':
      return databaseOpened(state, action)
    case 'DatabaseSavingData':
      return {
        ...state,
        savingData: true,
      }
    case 'DatabaseSavingDataCompleted':
      return {
        ...state,
        savingData: false,
      }
    case 'DatabaseMigrationStarted':
      return {
        ...state,
        migratingDatabase: true,
      }
    case 'DatabaseMigrationCompleted':
      return {
        ...state,
        migratingDatabase: false,
      }
    case 'DatabaseLoadingData':
      return {
        ...state,
        loadingData: true,
      }
    case 'DatabaseLoadingDataCompleted':
      return {
        ...state,
        loadingData: false,
      }
    case 'DatabaseClosing':
      return {
        ...state,
        closingDatabase: true,
      }
    case 'DatabaseClosed':
      return {
        ...state,
        closingDatabase: false,
        path: '',
      }
    default:
      return state
  }
}

function databaseOpened(
  state: RealmState,
  action: IDatabaseOpened,
): RealmState {
  return {
    ...state,
    path: action.realmHolder.realm ? action.realmHolder.realm.path : '',
    databaseLoaded: true,
  }
}
