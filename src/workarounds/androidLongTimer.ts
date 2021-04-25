import * as R from 'ramda'

import { InteractionManager, Platform } from 'react-native'

const _setTimeout = global.setTimeout
const _clearTimeout = global.clearTimeout
const MAX_TIMER_DURATION_MS = 60 * 1000

interface LongTimeout extends NodeJS.Timeout {
  id: string
}

/**
 *
 * Work around for Yellow Box Warning on Android: `Setting a timer for long time`
 *
 * Reference:
 *
 *    https://github.com/facebook/react-native/issues/12981
 *    https://github.com/firebase/firebase-js-sdk/issues/97
 *
 */
if (Platform.OS === 'android') {
  const timerFix: { [k: string]: any } = {}
  const runTask = (
    id: string,
    fn: Function,
    ttl: number,
    args: Array<any>,
  ): LongTimeout => {
    const waitingTime = ttl - Date.now()
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return
        }
        delete timerFix[id]
        fn(...args)
      })
      return timerFix[id]
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS)
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime)
    return timerFix[id]
  }

  global.setTimeout = (
    fn: (...args: any[]) => void,
    time: number,
    ...args: any[]
  ): LongTimeout | NodeJS.Timeout => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time
      const id = '_lt_' + Object.keys(timerFix).length
      const timeout = runTask(id, fn, ttl, args)
      return timeout
    }
    return _setTimeout(fn, time, ...args)
  }

  global.clearTimeout = (timeout: LongTimeout | NodeJS.Timeout) => {
    if (
      !R.isNil(timeout) &&
      Object.prototype.hasOwnProperty.call(timeout, 'id')
    ) {
      // @ts-ignore id existence has been checked
      const id: string = timeout.id

      if (!R.isNil(id) && id.startsWith('_lt_')) {
        _clearTimeout(timerFix[id])
        delete timerFix[id]
        return
      }
    }
    _clearTimeout(timeout)
  }
}
