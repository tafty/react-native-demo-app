import { call } from 'redux-saga/effects'

import performFetchRemoteConfig from './performFetchRemoteConfig'

export default function* executeStartUp(): Generator<any, void, void> {
  yield call(performFetchRemoteConfig)
}
