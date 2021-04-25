import 'react-native'

import { fireEvent, render } from 'react-native-testing-library'

import LoginScreen from '../loginScreen'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import React from 'react'
import ResponseError from '../../models/internal/responseError'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()

describe('Login Screen', () => {
  beforeEach(() => {
    Navigation.push = jest.fn()
  })

  it('Should render when network connected', () => {
    const componentId = 'component1'
    const initialState = {
      configuration: {
        remoteConfig: {
          security: {
            isOfflineLoginEnabled: false,
          },
        },
      },
      networkConnection: {
        isConnected: true,
        isInternetReachable: true,
      },
      security: {
        error: undefined,
        isAuthenticating: false,
        isOnlineLoginRequired: false,
        username: undefined,
      },
    }

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen
          componentId={componentId}
          isAuthenticating={false}
          isConnected={false}
          isOnlineLoginRequired={false}
          isOfflineLoginEnabled={false}
          createAction={() => {}}
        />
      </Provider>,
    )

    expect(getByTestId('username-input').props.value).toBe('')
    expect(getByTestId('password-input').props.value).toBe('')
    expect(getByTestId('login-button').props.isDisabled).toBeTruthy()

    expect(toJSON()).toMatchSnapshot()
  })

  it('Should render when online login is required but network disconnected', () => {
    const componentId = 'component1'
    const initialState = {
      configuration: {
        remoteConfig: {
          security: {
            isOfflineLoginEnabled: false,
          },
        },
      },
      networkConnection: {
        isConnected: false,
        isInternetReachable: true,
      },
      security: {
        error: undefined,
        isAuthenticating: false,
        isOnlineLoginRequired: true,
        username: undefined,
      },
    }

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen
          componentId={componentId}
          isAuthenticating={false}
          isConnected={false}
          isOnlineLoginRequired={false}
          isOfflineLoginEnabled={false}
          createAction={() => {}}
        />
      </Provider>,
    )

    expect(getByTestId('username-input').props.value).toBe('')
    expect(getByTestId('password-input').props.value).toBe('')
    expect(getByTestId('is_network_connected').props.children).toBe(
      'no_internet_connection',
    )
    expect(getByTestId('login-button').props.isDisabled).toBeTruthy()

    expect(toJSON()).toMatchSnapshot()
  })

  it('Should render when online login is required but internet is not reachable', () => {
    const componentId = 'component1'
    const initialState = {
      configuration: {
        remoteConfig: {
          security: {
            isOfflineLoginEnabled: false,
          },
        },
      },
      networkConnection: {
        isConnected: true,
        isInternetReachable: false,
      },
      security: {
        error: undefined,
        isAuthenticating: false,
        isOnlineLoginRequired: true,
        username: undefined,
      },
    }

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen
          componentId={componentId}
          isAuthenticating={false}
          isConnected={false}
          isOnlineLoginRequired={false}
          isOfflineLoginEnabled={false}
          createAction={() => {}}
        />
      </Provider>,
    )

    expect(getByTestId('username-input').props.value).toBe('')
    expect(getByTestId('password-input').props.value).toBe('')
    expect(getByTestId('is_network_connected').props.children).toBe(
      'no_internet_connection',
    )
    expect(getByTestId('login-button').props.isDisabled).toBeTruthy()

    expect(toJSON()).toMatchSnapshot()
  })

  it('Should render when username is known', () => {
    const componentId = 'component1'
    const username = 'bob'
    const initialState = {
      configuration: {
        remoteConfig: {
          security: {
            isOfflineLoginEnabled: false,
          },
        },
      },
      networkConnection: {
        isConnected: true,
        isInternetReachable: true,
      },
      security: {
        error: undefined,
        isAuthenticating: false,
        isOnlineLoginRequired: false,
        username,
      },
    }

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen
          componentId={componentId}
          isAuthenticating={false}
          isConnected={false}
          isOnlineLoginRequired={false}
          isOfflineLoginEnabled={false}
          createAction={() => {}}
        />
      </Provider>,
    )

    expect(getByTestId('username-input').props.value).toBe(username)
    expect(getByTestId('password-input').props.value).toBe('')
    expect(getByTestId('login-button').props.isDisabled).toBeTruthy()

    expect(toJSON()).toMatchSnapshot()
  })

  it('Should enable login button when username & password are entered and network is connected', () => {
    const componentId = 'component1'
    const username = 'bob'
    const initialState = {
      configuration: {
        remoteConfig: {
          security: {
            isOfflineLoginEnabled: false,
          },
        },
      },
      networkConnection: {
        isConnected: true,
        isInternetReachable: true,
      },
      security: {
        error: undefined,
        isAuthenticating: false,
        isOnlineLoginRequired: false,
        username,
      },
    }

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen
          componentId={componentId}
          isAuthenticating={false}
          isConnected={false}
          isOnlineLoginRequired={false}
          isOfflineLoginEnabled={false}
          createAction={() => {}}
        />
      </Provider>,
    )

    expect(getByTestId('username-input').props.value).toBe(username)
    expect(getByTestId('password-input').props.value).toBe('')
    expect(getByTestId('login-button').props.isDisabled).toBeTruthy()

    fireEvent.changeText(getByTestId('password-input'), 'pass')

    expect(getByTestId('login-button').props.isDisabled).toBeFalsy()

    expect(toJSON()).toMatchSnapshot()
  })

  it('Login button should remain disable when username & password are entered but network is disconnected and online login required', () => {
    const componentId = 'component1'
    const username = 'bob'
    const initialState = {
      configuration: {
        remoteConfig: {
          security: {
            isOfflineLoginEnabled: false,
          },
        },
      },
      networkConnection: {
        isConnected: false,
        isInternetReachable: true,
      },
      security: {
        error: undefined,
        isAuthenticating: false,
        isOnlineLoginRequired: true,
        username,
      },
    }

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen
          componentId={componentId}
          isAuthenticating={false}
          isConnected={false}
          isOnlineLoginRequired={false}
          isOfflineLoginEnabled={false}
          createAction={() => {}}
        />
      </Provider>,
    )

    expect(getByTestId('username-input').props.value).toBe(username)
    expect(getByTestId('password-input').props.value).toBe('')
    expect(getByTestId('is_network_connected').props.children).toBe(
      'no_internet_connection',
    )
    expect(getByTestId('login-button').props.isDisabled).toBeTruthy()

    fireEvent.changeText(getByTestId('password-input'), 'pass')

    expect(getByTestId('login-button').props.isDisabled).toBeTruthy()

    expect(toJSON()).toMatchSnapshot()
  })

  it('Should enable login button when username & password are entered and network is disconnected but offline login is enabled and online login is not required', () => {
    const componentId = 'component1'
    const username = 'bob'
    const initialState = {
      configuration: {
        remoteConfig: {
          security: {
            isOfflineLoginEnabled: true,
          },
        },
      },
      networkConnection: {
        isConnected: false,
        isInternetReachable: true,
      },
      security: {
        error: undefined,
        isAuthenticating: false,
        isOnlineLoginRequired: false,
        username,
      },
    }

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen
          componentId={componentId}
          isAuthenticating={false}
          isConnected={false}
          isOnlineLoginRequired={false}
          isOfflineLoginEnabled={false}
          createAction={() => {}}
        />
      </Provider>,
    )

    expect(getByTestId('username-input').props.value).toBe(username)
    expect(getByTestId('password-input').props.value).toBe('')
    expect(getByTestId('login-button').props.isDisabled).toBeTruthy()

    fireEvent.changeText(getByTestId('password-input'), 'pass')

    expect(getByTestId('login-button').props.isDisabled).toBeFalsy()

    expect(toJSON()).toMatchSnapshot()
  })

  it('Login button should remain disabled when username & password are entered and network is disconnected but offline login is enabled and online login is required', () => {
    const componentId = 'component1'
    const username = 'bob'
    const initialState = {
      configuration: {
        remoteConfig: {
          security: {
            isOfflineLoginEnabled: true,
          },
        },
      },
      networkConnection: {
        isConnected: false,
        isInternetReachable: true,
      },
      security: {
        error: undefined,
        isAuthenticating: false,
        isOnlineLoginRequired: true,
        username,
      },
    }

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen
          componentId={componentId}
          isAuthenticating={false}
          isConnected={false}
          isOnlineLoginRequired={false}
          isOfflineLoginEnabled={false}
          createAction={() => {}}
        />
      </Provider>,
    )

    expect(getByTestId('username-input').props.value).toBe(username)
    expect(getByTestId('password-input').props.value).toBe('')
    expect(getByTestId('login-button').props.isDisabled).toBeTruthy()

    fireEvent.changeText(getByTestId('password-input'), 'pass')

    expect(getByTestId('login-button').props.isDisabled).toBeTruthy()

    expect(toJSON()).toMatchSnapshot()
  })

  it('Login button should be disabled when authenticating', () => {
    const componentId = 'component1'
    const username = 'bob'
    const initialState = {
      configuration: {
        remoteConfig: {
          security: {
            isOfflineLoginEnabled: true,
          },
        },
      },
      networkConnection: {
        isConnected: true,
        isInternetReachable: true,
      },
      security: {
        error: undefined,
        isAuthenticating: true,
        isOnlineLoginRequired: true,
        username,
      },
    }

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen
          componentId={componentId}
          isAuthenticating={false}
          isConnected={false}
          isOnlineLoginRequired={false}
          isOfflineLoginEnabled={false}
          createAction={() => {}}
        />
      </Provider>,
    )

    expect(getByTestId('username-input').props.value).toBe(username)
    expect(getByTestId('password-input').props.value).toBe('')
    expect(getByTestId('login-button').props.isDisabled).toBeTruthy()

    fireEvent.changeText(getByTestId('password-input'), 'pass')

    expect(getByTestId('login-button').props.isDisabled).toBeTruthy()

    expect(toJSON()).toMatchSnapshot()
  })

  it('should be display the error message', () => {
    const componentId = 'component1'
    const username = 'bob'
    const error = ResponseError.createResponseError(500, 'server error')
    const initialState = {
      configuration: {
        remoteConfig: {
          security: {
            isOfflineLoginEnabled: true,
          },
        },
      },
      networkConnection: {
        isConnected: true,
        isInternetReachable: true,
      },
      security: {
        error,
        isAuthenticating: false,
        isOnlineLoginRequired: true,
        username,
      },
    }

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen
          componentId={componentId}
          isAuthenticating={false}
          isConnected={false}
          isOnlineLoginRequired={false}
          isOfflineLoginEnabled={false}
          createAction={() => {}}
        />
      </Provider>,
    )

    expect(getByTestId('username-input').props.value).toBe(username)
    expect(getByTestId('password-input').props.value).toBe('')
    expect(getByTestId('error_message').props.children).toBe(error.message)
    expect(getByTestId('login-button').props.isDisabled).toBeTruthy()

    expect(toJSON()).toMatchSnapshot()
  })
})
