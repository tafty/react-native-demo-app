import { call } from 'redux-saga/effects'

import performFetchRemoteConfig from './performFetchRemoteConfig'

export default function* executeNetworkStatusUpdated(): Generator<
  any,
  void,
  void
> {
  yield call(performFetchRemoteConfig)
}
