import moment from 'moment'
import * as R from 'ramda'
import { select } from 'redux-saga/effects'

import { ISecuritySession } from '../../models/currentInterfaces'
import { getSessionTimeOutInMinutes } from '../../selectors/configuration/getSessionTimeOutInMinutes'

export default function* getHasSessionExpired(session: ISecuritySession) {
  const sessionTimeOutInMinutes = yield select(getSessionTimeOutInMinutes)

  return (
    !R.isNil(session.passwordHash) &&
    !R.isEmpty(session.passwordHash) &&
    sessionTimeOutInMinutes > 0 &&
    moment()
      .subtract(sessionTimeOutInMinutes, 'minutes')
      .isAfter(session.created)
  )
}
