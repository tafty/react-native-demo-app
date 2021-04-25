import * as Redux from 'redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware, { END, Saga, Task } from 'redux-saga'

import combineReducers from '../reducers'

interface ApplicationStore<S = any, A extends Redux.Action = Redux.AnyAction>
  extends Redux.Store<S, A> {
  runSaga?<S extends Saga<any[]>>(saga: S, ...args: Parameters<S>): Task
  close?(): END
}

function configureStore(initialState: any = {}) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  const newStore: ApplicationStore = createStore(
    combineReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  )

  newStore.runSaga = sagaMiddleware.run
  newStore.close = () => newStore.dispatch(END)
  return newStore
}

const store = configureStore()

export default store
