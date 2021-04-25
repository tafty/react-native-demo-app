import Realm from 'realm'
import rimraf from 'rimraf'
import path from 'path'

import { switchDatabase } from '../index'

import { getRealmPath } from '../../selectors/realm/getRealmPath'
import { getRealmEncryptionKey } from '../../selectors/realm/getRealmEncryptionKey'
import { getIsRealmEncrypted } from '../../selectors/realm/getIsRealmEncrypted'

/**
 *
 * This test results in the jest warning:
 *
 * A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --runInBand --detectOpenHandles to find leaks.
 *
 * The advised options do not work in line with this open issue:
 *
 * https://github.com/facebook/jest/issues/9473
 *
 */
describe('database', () => {
  describe('switch database', () => {
    it('should close the database, migrate the database and open it', () => {
      const realmHolder = { realm: new Realm() }
      const generator = switchDatabase()

      const expected = [
        {
          done: false,
          value: {
            '@@redux-saga/IO': true,
            type: 'PUT',
            combinator: false,
            payload: {
              action: { type: 'DatabaseClosing' },
              channel: undefined,
            },
          },
        },
        {
          done: false,
          value: {
            '@@redux-saga/IO': true,
            type: 'PUT',
            combinator: false,
            payload: {
              action: { type: 'DatabaseClosed' },
              channel: undefined,
            },
          },
        },
        {
          done: false,
          value: {
            '@@redux-saga/IO': true,
            type: 'PUT',
            combinator: false,
            payload: {
              action: { type: 'DatabaseMigrationStarted' },
              channel: undefined,
            },
          },
        },
        {
          done: false,
          value: {
            '@@redux-saga/IO': true,
            type: 'SELECT',
            combinator: false,
            payload: { args: [], selector: getRealmPath },
          },
        },
        {
          done: false,
          value: {
            '@@redux-saga/IO': true,
            type: 'SELECT',
            combinator: false,
            payload: { args: [], selector: getRealmEncryptionKey },
          },
        },
        {
          done: false,
          value: {
            '@@redux-saga/IO': true,
            type: 'SELECT',
            combinator: false,
            payload: { args: [], selector: getIsRealmEncrypted },
          },
        },
        {
          done: false,
          value: {
            '@@redux-saga/IO': true,
            type: 'PUT',
            combinator: false,
            payload: {
              action: { type: 'DatabaseMigrationCompleted' },
              channel: undefined,
            },
          },
        },
        {
          done: false,
          value: {
            '@@redux-saga/IO': true,
            type: 'PUT',
            combinator: false,
            payload: {
              action: { type: 'DatabaseOpening' },
              channel: undefined,
            },
          },
        },
        {
          done: false,
          value: {
            '@@redux-saga/IO': true,
            type: 'SELECT',
            combinator: false,
            payload: { args: [], selector: getRealmPath },
          },
        },
        {
          done: false,
          value: {
            '@@redux-saga/IO': true,
            type: 'SELECT',
            combinator: false,
            payload: { args: [], selector: getRealmEncryptionKey },
          },
        },
        {
          done: false,
          value: {
            '@@redux-saga/IO': true,
            type: 'SELECT',
            combinator: false,
            payload: { args: [], selector: getIsRealmEncrypted },
          },
        },
        {
          done: false,
          value: {
            '@@redux-saga/IO': true,
            type: 'PUT',
            combinator: false,
            payload: {
              action: { type: 'DatabaseOpened', realmHolder },
              channel: undefined,
            },
          },
        },
        { done: true, value: undefined },
      ]

      expect(generator.next()).toEqual(expected[0])

      expect(generator.next()).toEqual(expected[1])

      expect(generator.next()).toEqual(expected[2])

      expect(generator.next()).toEqual(expected[3])

      expect(generator.next('databasePath')).toEqual(expected[4])

      expect(generator.next('key')).toEqual(expected[5])

      expect(generator.next()).toEqual(expected[6])

      expect(generator.next()).toEqual(expected[7])

      expect(generator.next('databasePath')).toEqual(expected[8])

      expect(generator.next('key')).toEqual(expected[9])

      expect(generator.next()).toEqual(expected[10])

      expect(generator.next()).toEqual(expected[11])

      expect(generator.next()).toEqual(expected[12])

      realmHolder.realm.close()
    })
  })

  afterAll(() => {
    const root = path.join(__dirname, '..', '..', '..')
    const defaultRealm = path.join(root, 'default.realm*')
    const databasePath = path.join(root, 'databasePath*')
    const server = path.join(root, 'realm-object-server*')
    const key = path.join(root, 'key')
    const keyLock = path.join(root, 'key.lock')
    const keyManagement = path.join(root, 'key.management')

    rimraf.sync(defaultRealm)
    rimraf.sync(databasePath)
    rimraf.sync(server)
    rimraf.sync(key)
    rimraf.sync(keyLock)
    rimraf.sync(keyManagement)
  })
})
