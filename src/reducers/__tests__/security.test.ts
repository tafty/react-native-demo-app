import security from '../security'
import { createAction } from '../../actions/createAction'
import ResponseError from '../../models/internal/responseError'

describe('Security reducer', () => {
  it('should return the default state', () => {
    const initialState = {
      error: undefined,
      isAuthenticating: false,
      isLoggedIn: false,
      isLoginRequired: true,
      isOnlineLoginRequired: true,
      username: undefined,
    }

    const state = security()

    expect(state).toEqual(initialState)
  })

  it('should return the state unchanged if action type is unrecognised', () => {
    const initialState = {
      error: undefined,
      isAuthenticating: false,
      isLoggedIn: false,
      isLoginRequired: true,
      isOnlineLoginRequired: true,
      username: undefined,
    }

    const action = createAction('DatabaseClosing', {})
    const state = security(initialState, action)

    expect(state).toEqual(initialState)
  })

  describe('when log out starts', () => {
    it('new state should be updated', () => {
      const updatedState = {
        error: undefined,
        isAuthenticating: false,
        isLoggedIn: true,
        isLoginRequired: false,
        isOnlineLoginRequired: false,
        username: 'bob',
      }

      const action = createAction('LogOutStarted', {})

      const state = security(updatedState, action)

      expect(state.isLoggedIn).toBeFalsy()
      expect(state.isLoginRequired).toBeTruthy()
      expect(state.isOnlineLoginRequired).toBeTruthy()
      expect(state.username).toBeUndefined()
    })
  })

  describe('when log in fails', () => {
    it('new state should be updated', () => {
      const error = ResponseError.createResponseError(500, 'error message')
      const updatedState = {
        error: undefined,
        isAuthenticating: true,
        isLoggedIn: true,
        isLoginRequired: false,
        isOnlineLoginRequired: false,
        username: undefined,
      }

      const action = createAction('LoginFailed', { error })

      const state = security(updatedState, action)

      expect(state.isAuthenticating).toBeFalsy()
      expect(state.isLoggedIn).toBeFalsy()
      expect(state.error).toEqual(error)
    })
  })

  describe('when log in starts', () => {
    it('new state should be updated', () => {
      const username = 'bob'
      const password = '1234'
      const updatedState = {
        error: undefined,
        isAuthenticating: false,
        isLoggedIn: true,
        isLoginRequired: false,
        isOnlineLoginRequired: false,
        username,
      }

      const action = createAction('LoginStarted', {
        username,
        password,
      })

      const state = security(updatedState, action)

      expect(state.isAuthenticating).toBeTruthy()
    })
  })

  describe('when log in succeeds', () => {
    it('new state should be updated', () => {
      const error = ResponseError.createResponseError(500, 'error message')
      const isOnlineLoginRequired = true
      const username = 'bob'
      const updatedState = {
        error,
        isAuthenticating: true,
        isLoggedIn: true,
        isLoginRequired: false,
        isOnlineLoginRequired: false,
        username: undefined,
      }

      const action = createAction('LoginSucceeded', {
        isOnlineLoginRequired,
        username,
      })

      const state = security(updatedState, action)

      expect(state.error).toBeUndefined()
      expect(state.isAuthenticating).toBeFalsy()
      expect(state.isLoggedIn).toBeTruthy()
      expect(state.isLoginRequired).toBeFalsy()
      expect(state.isOnlineLoginRequired).toBeTruthy()
      expect(state.username).toEqual(username)
    })
  })

  describe('when log is required', () => {
    it('new state should be updated', () => {
      const updatedState = {
        error: undefined,
        isAuthenticating: false,
        isLoggedIn: true,
        isLoginRequired: false,
        isOnlineLoginRequired: false,
        username: 'bob',
      }

      const action = createAction('RequireLogin', {})

      const state = security(updatedState, action)

      expect(state.isLoggedIn).toBeFalsy()
      expect(state.isLoginRequired).toBeTruthy()
    })
  })

  describe('when security session expires', () => {
    it('new state should be updated', () => {
      const error = ResponseError.createResponseError(500, 'error message')
      const updatedState = {
        error: undefined,
        isAuthenticating: false,
        isLoggedIn: true,
        isLoginRequired: false,
        isOnlineLoginRequired: false,
        username: 'bob',
      }

      const action = createAction('SecuritySessionExpired', { error })

      const state = security(updatedState, action)

      expect(state.isLoggedIn).toBeFalsy()
      expect(state.isLoginRequired).toBeTruthy()
      expect(state.isOnlineLoginRequired).toBeTruthy()
      expect(state.error).toEqual(error)
    })
  })
})
