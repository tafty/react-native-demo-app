import { put, select } from 'redux-saga/effects'

import Realm from 'realm'
import deviceLog from 'react-native-device-log'

import SchemaList from '../models/schemaList'

import { createAction } from '../actions/createAction'

import { getRealmPath } from '../selectors/realm/getRealmPath'
import { getIsRealmEncrypted } from '../selectors/realm/getIsRealmEncrypted'
import { getRealmEncryptionKey } from '../selectors/realm/getRealmEncryptionKey'

export class RealmHolder {
  realm?: Realm
}

const realmHolder = new RealmHolder()

export function* switchDatabase(): Generator<any, void, any> {
  yield* closeDatabase()
  yield* loadDatabase()
}

function* loadDatabase(): Generator<any, void, any> {
  yield* performMigrations()
  yield* openDatabase()
}

function* openDatabase(): Generator<any, void, any> {
  try {
    yield put(createAction('DatabaseOpening', {}))
    const databasePath = yield select(getRealmPath)
    const encryptionKey = yield select(getRealmEncryptionKey)

    const schemaList = SchemaList.schemas
    const options = {
      ...schemaList[schemaList.length - 1],
      path: databasePath,
      encryptionKey: undefined,
    }

    const isEncrypted = yield select(getIsRealmEncrypted)
    if (isEncrypted) {
      options.encryptionKey = encryptionKey
    } else {
      deviceLog.debug('NOT Encrypting Database')
    }

    realmHolder.realm = new Realm(options)
    yield put(createAction('DatabaseOpened', { realmHolder }))
  } catch (e) {
    deviceLog.error(e)
  }
}

function* closeDatabase(): Generator<any, void, void> {
  try {
    yield put(createAction('DatabaseClosing', {}))

    if (realmHolder.realm) {
      realmHolder.realm.close()
      realmHolder.realm = undefined
    }

    yield put(createAction('DatabaseClosed', {}))
  } catch (e) {
    deviceLog.error(e)
  }
}

function* performMigrations(): Generator<any, void, any> {
  try {
    yield put(createAction('DatabaseMigrationStarted', {}))
    const databasePath = yield select(getRealmPath)
    const encryptionKey = yield select(getRealmEncryptionKey)

    const schemaList = SchemaList.schemas
    const isEncrypted = yield select(getIsRealmEncrypted)

    let nextSchemaIndex = isEncrypted
      ? Realm.schemaVersion(databasePath, encryptionKey)
      : Realm.schemaVersion(databasePath)

    while (nextSchemaIndex >= 0 && nextSchemaIndex < schemaList.length) {
      console.log('MIGRATING', schemaList[nextSchemaIndex])
      const options = {
        ...schemaList[nextSchemaIndex],
        path: databasePath,
        encryptionKey: undefined,
      }

      if (isEncrypted) {
        options.encryptionKey = encryptionKey
      }

      const migratedRealm = new Realm(options)
      migratedRealm.close()
      nextSchemaIndex++
    }

    yield put(createAction('DatabaseMigrationCompleted', {}))
  } catch (e) {
    deviceLog.error(e)
  }
}

export default realmHolder
