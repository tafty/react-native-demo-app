import * as R from 'ramda'

import type { Action } from '../actions'
import { ILoginFailed } from '../actions/security/ILoginFailed'
import { ILoginSucceeded } from '../actions/security/ILoginSucceeded'
import { ISecuritySessionExpired } from '../actions/security/ISecuritySessionExpired'
import { ISecuritySessionLoadCompleted } from '../actions/security/ISecuritySessionLoadCompleted'
import ResponseError from '../models/internal/responseError'

export type SecurityState = {
  error?: ResponseError
  isAuthenticating: boolean
  isLoggedIn: boolean
  isLoginRequired: boolean
  isOnlineLoginRequired: boolean
  username: string | undefined
}

const initialState = {
  error: undefined,
  isAuthenticating: false,
  isLoggedIn: false,
  isLoginRequired: true,
  isOnlineLoginRequired: true,
  username: undefined,
}

const security = (
  state: SecurityState = initialState,
  action?: Action,
): SecurityState => {
  if (R.isNil(action) || R.isNil(action.type)) {
    return state
  }

  switch (action.type) {
    case 'LogOutStarted': {
      return {
        ...state,
        isLoggedIn: false,
        isLoginRequired: true,
        isOnlineLoginRequired: true,
        username: undefined,
      }
    }
    case 'LoginFailed': {
      return loginFailed(state, action)
    }
    case 'LoginStarted': {
      return {
        ...state,
        isAuthenticating: true,
      }
    }
    case 'LoginSucceeded': {
      return loginSucceeded(state, action)
    }
    case 'RequireLogin': {
      return {
        ...state!,
        isLoggedIn: false,
        isLoginRequired: true,
      }
    }
    case 'SecuritySessionExpired': {
      return securitySessionExpired(state, action)
    }
    case 'SecuritySessionLoadCompleted': {
      return securitySessionLoadCompleted(state, action)
    }
    default: {
      return state
    }
  }
}

const loginFailed = (
  state: SecurityState,
  action: ILoginFailed,
): SecurityState => {
  return {
    ...state,
    isAuthenticating: false,
    isLoggedIn: false,
    error: action.error,
  }
}

const loginSucceeded = (
  state: SecurityState,
  action: ILoginSucceeded,
): SecurityState => {
  return {
    ...state,
    error: undefined,
    isAuthenticating: false,
    isLoggedIn: true,
    isLoginRequired: false,
    isOnlineLoginRequired: action.isOnlineLoginRequired,
    username: action.username,
  }
}

const securitySessionExpired = (
  state: SecurityState,
  action: ISecuritySessionExpired,
): SecurityState => {
  return {
    ...state,
    isLoggedIn: false,
    isLoginRequired: true,
    isOnlineLoginRequired: true,
    error: action.error,
  }
}

const securitySessionLoadCompleted = (
  state: SecurityState,
  action: ISecuritySessionLoadCompleted,
): SecurityState => {
  return {
    ...state,
    username: action.username,
  }
}

export default security
