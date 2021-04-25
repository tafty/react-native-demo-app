import { select } from 'redux-saga/effects'

import { deleteSecuritySession, loadSecuritySession } from '../../data/security'
import { getRealm } from '../../selectors/realm/getRealm'

export default function* executeLogOut(): Generator<any, void, any> {
  const realm = yield select(getRealm)
  const session = loadSecuritySession(realm)

  deleteSecuritySession(session.securitySessionId, realm)
}
