import * as R from 'ramda'

import CurrentModels from '../models'
import { ISecuritySession } from '../models/currentInterfaces'
import Realm from 'realm'

const { SecuritySession } = CurrentModels

const translate = function translate(
  securityResults: Realm.Results<ISecuritySession>,
) {
  let plainResults = securityResults.map(session => {
    return SecuritySession.fromRealmObject(session)
  })

  return plainResults
}

export function loadSecuritySession(realm: Realm): ISecuritySession {
  let results = realm.objects<ISecuritySession>(SecuritySession.schema.name)

  if (results.length > 0) {
    let sortedResults = results.sorted('created')

    let plainResults = translate(sortedResults)
    return plainResults[0]
  } else {
    const newSession = new SecuritySession()
    newSession.securitySessionId = '1'
    newSession.created = new Date()
    newSession.failedPINAttempts = 0

    return newSession
  }
}

export function saveSecuritySession(
  currentSession: ISecuritySession,
  realm: Realm,
) {
  realm.write(() => {
    realm.create(
      SecuritySession.schema.name,
      currentSession,
      Realm.UpdateMode.Modified,
    )
  })
}

export function deleteSecuritySession(
  securitySessionId: string,
  realm: Realm,
): void {
  realm.write(() => {
    const record = realm.objectForPrimaryKey(
      SecuritySession.schema.name,
      securitySessionId,
    )
    if (!R.isNil(record)) {
      realm.delete(record)
    }
  })
}
