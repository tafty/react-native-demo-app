import { takeLatest } from 'redux-saga/effects'

import executeNetworkStatusUpdated from './configuration/executeNetworkStatusUpdated'
import executeStartUp from './configuration/executeStartUp'

import { ActionType } from '../actions/actionType'

export function* watchStartUp() {
  const pattern: ActionType = 'StartUp'
  yield takeLatest(pattern, executeStartUp)
}

export function* watchForNetworkStatusUpdated() {
  const pattern: ActionType = 'NetworkStatusUpdate'
  yield takeLatest(pattern, executeNetworkStatusUpdated)
}
