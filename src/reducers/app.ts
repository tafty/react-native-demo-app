import * as R from 'ramda'

import type { Action } from '../actions'

export type AppState = {
  hasAppInitialised: boolean
  isActive: boolean
}

const initialState = {
  hasAppInitialised: false,
  isActive: false,
}

const app = (state: AppState = initialState, action?: Action): AppState => {
  if (R.isNil(action) || R.isNil(action.type)) {
    return state
  }

  switch (action.type) {
    case 'AppActive': {
      return {
        ...state,
        isActive: true,
      }
    }
    case 'AppInactive': {
      return {
        ...state,
        isActive: false,
      }
    }
    case 'AppInitialised': {
      return {
        ...state,
        hasAppInitialised: true,
      }
    }
    default: {
      //  state cannot be null as a default is provided
      return state
    }
  }
}

export default app
