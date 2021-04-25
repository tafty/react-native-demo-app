import 'react-native'
import React from 'react'
import { Navigation } from 'react-native-navigation'
import { render, fireEvent } from 'react-native-testing-library'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import HomeScreen from '../homeScreen'
import * as screens from '../screens'

const mockStore = configureStore()

describe('Home Screen', () => {
  beforeEach(() => {
    Navigation.push = jest.fn()
  })

  it('Should render when network connected', () => {
    const componentId = 'component1'
    const connectionType = 'wifi'
    const environment = 'test'
    const initialState = {
      configuration: {
        localConfig: {
          environment,
        },
      },
      networkConnection: {
        isConnected: true,
        isInternetReachable: true,
        connectionType,
      },
    }

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <HomeScreen
          componentId={componentId}
          isConnected={false}
          createAction={() => {}}
          realmPath=""
        />
      </Provider>,
    )

    expect(getByTestId('is_network_connected').props.children).toMatchObject([
      'is_network_connected',
      ': ',
      'yes',
    ])
    expect(getByTestId('is_internet_reachable').props.children).toMatchObject([
      'is_internet_reachable',
      ': ',
      'yes',
    ])
    expect(
      getByTestId('network_connection_type').props.children,
    ).toMatchObject(['network_connection_type', ': ', connectionType])
    expect(getByTestId('current_realm_path').props.children).toMatchObject([
      'current_realm_path',
      ': ',
      environment + '.realm',
    ])

    fireEvent.press(getByTestId('settings-button'))
    const push = Navigation.push as jest.Mock
    expect(push.mock.calls).toHaveLength(1)
    expect(push.mock.calls[0][1].component.name).toEqual(screens.SETTINGS)

    expect(toJSON()).toMatchSnapshot()
  })

  it('Should render values when network not connected', () => {
    const componentId = 'component1'
    const connectionType = 'none'
    const environment = 'test2'
    const initialState = {
      configuration: {
        localConfig: {
          environment,
        },
      },
      networkConnection: {
        isConnected: false,
        isInternetReachable: false,
        connectionType,
      },
    }

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <HomeScreen
          componentId={componentId}
          isConnected={false}
          createAction={() => {}}
          realmPath=""
        />
      </Provider>,
    )

    expect(getByTestId('is_network_connected').props.children).toMatchObject([
      'is_network_connected',
      ': ',
      'no',
    ])
    expect(getByTestId('is_internet_reachable').props.children).toMatchObject([
      'is_internet_reachable',
      ': ',
      'no',
    ])
    expect(
      getByTestId('network_connection_type').props.children,
    ).toMatchObject(['network_connection_type', ': ', connectionType])
    expect(getByTestId('current_realm_path').props.children).toMatchObject([
      'current_realm_path',
      ': ',
      environment + '.realm',
    ])

    fireEvent.press(getByTestId('settings-button'))
    const push = Navigation.push as jest.Mock
    expect(push.mock.calls).toHaveLength(1)
    expect(push.mock.calls[0][1].component.name).toEqual(screens.SETTINGS)

    expect(toJSON()).toMatchSnapshot()
  })
})
