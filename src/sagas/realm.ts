import { takeLatest } from 'redux-saga/effects'

import { ActionType } from '../actions/actionType'

import { switchDatabase } from '../database'

export function* watchStartUp() {
  const pattern: ActionType = 'StartUp'
  yield takeLatest(pattern, switchDatabase)
}
