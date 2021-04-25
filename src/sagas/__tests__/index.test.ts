import { all, fork } from 'redux-saga/effects'
import root from '../index'
import {
  watchStartUp as watchStartUpConfiguration,
  watchForNetworkStatusUpdated,
} from '../configuration'
import { watchStartUp as watchStartUpRealm } from '../realm'
import { watchForSecurityActions } from '../security'

describe('root', () => {
  it('should fork all generators', () => {
    const generator = root()
    const expected = all([
      fork(watchStartUpConfiguration),
      fork(watchStartUpRealm),
      fork(watchForNetworkStatusUpdated),
      fork(watchForSecurityActions),
    ])

    expect(generator.next().value).toEqual(expected)
  })
})
