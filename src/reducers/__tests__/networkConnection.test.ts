import networkConnection from '../networkConnection'
import { createAction } from '../../actions/createAction'

describe('Network connection reducer', () => {
  it('should return the default state', () => {
    const initialState = {
      isConnected: false,
      isInternetReachable: false,
      connectionType: undefined,
    }

    const action = createAction('DatabaseClosing', {})
    const state = networkConnection(undefined, action)

    expect(state).toEqual(initialState)
  })

  it('should return the state unchanged if action type is unrecognised', () => {
    const initialState = {
      isConnected: false,
      isInternetReachable: false,
      connectionType: undefined,
    }

    const action = createAction('DatabaseClosing', {})
    const state = networkConnection(initialState, action)

    expect(state).toEqual(initialState)
  })

  describe('when network status updated', () => {
    it('new state connectionType should be the supplied connectionType', () => {
      const updatedState = {
        isConnected: true,
        isInternetReachable: true,
        connectionType: 'connection_type',
      }

      const action = createAction('NetworkStatusUpdate', {
        payload: {
          isConnected: true,
          isInternetReachable: true,
          type: 'new_connection_type',
        },
      })

      const state = networkConnection(updatedState, action)

      expect(state.connectionType).toEqual(action.payload.type)
    })

    it('isConnected should be set false if the payload isConnected is false', () => {
      const updatedState = {
        isConnected: true,
        isInternetReachable: false,
        connectionType: undefined,
      }

      const action = createAction('NetworkStatusUpdate', {
        payload: {
          isConnected: false,
          isInternetReachable: false,
          type: undefined,
        },
      })

      const state = networkConnection(updatedState, action)

      expect(state.isConnected).toBeFalsy()
    })

    it('isConnected should be set true if the payload isConnected is true', () => {
      const updatedState = {
        isConnected: false,
        isInternetReachable: false,
        connectionType: undefined,
      }

      const action = createAction('NetworkStatusUpdate', {
        payload: {
          isConnected: true,
          isInternetReachable: false,
          type: undefined,
        },
      })

      const state = networkConnection(updatedState, action)

      expect(state.isConnected).toBeTruthy()
    })

    it('isInternetReachable should be set false if the payload isInternetReachable is false', () => {
      const updatedState = {
        isConnected: false,
        isInternetReachable: true,
        connectionType: undefined,
      }

      const action = createAction('NetworkStatusUpdate', {
        payload: {
          isConnected: false,
          isInternetReachable: false,
          type: undefined,
        },
      })

      const state = networkConnection(updatedState, action)

      expect(state.isInternetReachable).toBeFalsy()
    })

    it('isInternetReachable should be set true if the payload isInternetReachable is true', () => {
      const updatedState = {
        isConnected: false,
        isInternetReachable: false,
        connectionType: undefined,
      }

      const action = createAction('NetworkStatusUpdate', {
        payload: {
          isConnected: false,
          isInternetReachable: true,
          type: undefined,
        },
      })

      const state = networkConnection(updatedState, action)

      expect(state.isInternetReachable).toBeTruthy()
    })
  })
})
