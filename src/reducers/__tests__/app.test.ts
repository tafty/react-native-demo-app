import app from '../app'
import { createAction } from '../../actions/createAction'

describe('App reducer', () => {
  it('should return the default state', () => {
    const initialState = {
      hasAppInitialised: false,
      isActive: false,
    }

    const state = app()

    expect(state).toEqual(initialState)
  })

  it('should return the state unchanged if action type is unrecognised', () => {
    const initialState = {
      hasAppInitialised: false,
      isActive: false,
    }

    const action = createAction('DatabaseClosing', {})
    const state = app(initialState, action)

    expect(state).toEqual(initialState)
  })

  describe('when app becomes active', () => {
    it('new state should indicate it is active', () => {
      const updatedState = {
        hasAppInitialised: false,
        isActive: false,
      }

      const action = createAction('AppActive', {})

      const state = app(updatedState, action)

      expect(state.isActive).toBeTruthy()
    })
  })

  describe('when app becomes inactive', () => {
    it('new state should indicate it is in inactive', () => {
      const updatedState = {
        hasAppInitialised: false,
        isActive: true,
      }

      const action = createAction('AppInactive', {})

      const state = app(updatedState, action)

      expect(state.isActive).toBeFalsy()
    })
  })

  describe('when app is initialised', () => {
    it('new state should indicate it is initialised', () => {
      const updatedState = {
        hasAppInitialised: false,
        isActive: false,
      }

      const action = createAction('AppInitialised', {})

      const state = app(updatedState, action)

      expect(state.hasAppInitialised).toBeTruthy()
    })
  })
})
