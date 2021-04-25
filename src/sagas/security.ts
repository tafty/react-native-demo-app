import { all, takeLatest, fork } from 'redux-saga/effects'

import executeAppActive from './security/executeAppActive'
import executeAppInactive from './security/executeAppInactive'
import executeLoadSession from './security/executeLoadSession'
import executeLogin from './security/executeLogin'
import executeLogOut from './security/executeLogOut'

import { ActionType } from '../actions/actionType'

export function* watchForAppActive() {
  const pattern: ActionType = 'AppActive'
  yield takeLatest(pattern, executeAppActive)
}

export function* watchForAppInactive() {
  const pattern: ActionType = 'AppInactive'
  yield takeLatest(pattern, executeAppInactive)
}

export function* watchForDatabaseOpened() {
  const pattern: ActionType = 'DatabaseOpened'
  yield takeLatest(pattern, executeLoadSession)
}

export function* watchForLoginStarted() {
  const pattern: ActionType = 'LoginStarted'
  yield takeLatest(pattern, executeLogin)
}

export function* watchForLogOutStarted() {
  const pattern: ActionType = 'LogOutStarted'
  yield takeLatest(pattern, executeLogOut)
}

export function* watchForSecurityActions() {
  yield all([
    fork(watchForAppActive),
    fork(watchForAppInactive),
    fork(watchForDatabaseOpened),
    fork(watchForLoginStarted),
    fork(watchForLogOutStarted),
  ])
}
