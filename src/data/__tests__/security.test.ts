import {
  deleteSecuritySession,
  loadSecuritySession,
  saveSecuritySession,
} from '../security'

import CurrentModels from '../../models'
import MockDate from 'mockdate'
import Realm from 'realm'
import SchemaList from '../../models/schemaList'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import uuid from 'uuid'

const { SecuritySession } = CurrentModels

const MOCK_DATE = '2020-04-25T10:00:00.000Z'

describe('Security Session data layer', () => {
  const databaseDirectory = path.join(__dirname, uuid.v4())
  const databasePath = path.join(databaseDirectory, 'latest.realm')
  let testRealm: Realm

  const securitySessionId = '123'
  const username = 'bob@bobbins.com'
  const passwordHash = 'hashhash'
  const failedPINAttempts = 1

  const createSecuritySession = () => {
    const securitySession = new SecuritySession()
    securitySession.securitySessionId = securitySessionId
    securitySession.username = username
    securitySession.passwordHash = passwordHash
    securitySession.failedPINAttempts = failedPINAttempts
    return securitySession
  }

  const insertSecuritySession = () => {
    testRealm.write(() => {
      const securitySession = createSecuritySession()
      testRealm.create(SecuritySession.schema.name, securitySession)
    })

    expect(testRealm.objects(SecuritySession.schema.name)).toHaveLength(1)
  }

  beforeAll(async done => {
    // create a directory for the database files
    fs.mkdir(databaseDirectory, () => {
      const options = {
        ...SchemaList.schemas[SchemaList.schemas.length - 1],
        path: databasePath,
      }

      testRealm = new Realm(options)

      done()
    })

    MockDate.set(MOCK_DATE)
  })

  beforeEach(async done => {
    testRealm.write(() => {
      const securitySessions = testRealm.objects(SecuritySession.schema.name)
      testRealm.delete(securitySessions)
    })

    done()
  })

  afterAll(async done => {
    testRealm.close()

    rimraf(databaseDirectory, (error: Error) => {
      if (error) {
        console.log(error)
      }

      done()
    })

    const root = path.join(__dirname, '..', '..', '..')
    const server = path.join(root, 'realm-object-server*')
    rimraf.sync(server)

    MockDate.reset()
  })

  it('should load an existing SecuritySession from the database', () => {
    insertSecuritySession()

    const securitySession = loadSecuritySession(testRealm)
    expect(securitySession).toBeDefined()
    expect(securitySession.securitySessionId).toEqual(securitySessionId)
    expect(securitySession.username).toEqual(username)
    expect(securitySession.passwordHash).toEqual(passwordHash)
    expect(securitySession.created.toISOString()).toEqual(MOCK_DATE)
    expect(securitySession.failedPINAttempts).toEqual(failedPINAttempts)
  })

  it('should create a new SecuritySession if an existing SecuritySession does not exist', () => {
    const securitySession = loadSecuritySession(testRealm)
    expect(securitySession).toBeDefined()
    expect(securitySession.securitySessionId).toEqual('1')
    expect(securitySession.username).toBeUndefined()
    expect(securitySession.passwordHash).toBeUndefined()
    expect(securitySession.created).toEqual(new Date())
    expect(securitySession.failedPINAttempts).toEqual(0)
  })

  it('should save a SecuritySession to the database', () => {
    const securitySession = createSecuritySession()
    saveSecuritySession(securitySession, testRealm)

    const savedSecuritySession = loadSecuritySession(testRealm)
    expect(savedSecuritySession).toBeDefined()
    expect(savedSecuritySession.securitySessionId).toEqual(securitySessionId)
    expect(securitySession.username).toEqual(username)
    expect(securitySession.passwordHash).toEqual(passwordHash)
    expect(securitySession.created.toISOString()).toEqual(MOCK_DATE)
    expect(securitySession.failedPINAttempts).toEqual(failedPINAttempts)
  })

  it('should load, update and save a SecuritySession to the database', () => {
    insertSecuritySession()

    const securitySession = loadSecuritySession(testRealm)

    const newUsername = 'bub@bubbins.com'
    const newPasswordHash = 'hashhashhash'
    const newFailedPINAttempts = 2

    securitySession.username = newUsername
    securitySession.passwordHash = newPasswordHash
    securitySession.failedPINAttempts = newFailedPINAttempts

    saveSecuritySession(securitySession, testRealm)

    const updatedSecuritySession = loadSecuritySession(testRealm)
    expect(updatedSecuritySession).toBeDefined()
    expect(updatedSecuritySession.securitySessionId).toEqual(securitySessionId)
    expect(updatedSecuritySession.username).toEqual(newUsername)
    expect(updatedSecuritySession.passwordHash).toEqual(newPasswordHash)
    expect(updatedSecuritySession.failedPINAttempts).toEqual(
      newFailedPINAttempts,
    )
  })

  it('should delete a SecuritySession from the database', () => {
    let initialResult = testRealm.objects(SecuritySession.schema.name)
    expect(initialResult).toHaveLength(0)

    insertSecuritySession()

    let securitySessions = testRealm.objects(SecuritySession.schema.name)
    expect(securitySessions).toHaveLength(1)

    deleteSecuritySession(securitySessionId, testRealm)

    let finalResult = testRealm.objects(SecuritySession.schema.name)
    expect(finalResult).toHaveLength(0)
  })
})
