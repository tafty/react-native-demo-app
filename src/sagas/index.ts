import { all, fork } from 'redux-saga/effects'
import {
  watchStartUp as watchStartUpConfiguration,
  watchForNetworkStatusUpdated,
} from './configuration'
import { watchStartUp as watchStartUpRealm } from './realm'
import { watchForSecurityActions } from './security'

export default function* root() {
  yield all([
    fork(watchStartUpConfiguration),
    fork(watchStartUpRealm),
    fork(watchForNetworkStatusUpdated),
    fork(watchForSecurityActions),
  ])
}
