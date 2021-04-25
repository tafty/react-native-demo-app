import 'react-native'

import * as screens from '../../screens'

import { fireEvent, render } from 'react-native-testing-library'

import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import React from 'react'
import SettingsScreen from '../index'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()

describe('Settings Screen', () => {
  beforeEach(() => {
    Navigation.push = jest.fn()
  })

  it('Should render correctly and diagnostics button should navigate to correct screens', () => {
    const componentId = 'component1'
    const initialState = {}

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <SettingsScreen componentId={componentId} />
      </Provider>,
    )

    fireEvent.press(getByTestId('Diagnostics-button'))
    const push = Navigation.push as jest.Mock
    expect(push.mock.calls).toHaveLength(1)
    expect(push.mock.calls[0][1].component.name).toEqual(screens.DIAGNOSTICS)

    expect(toJSON()).toMatchSnapshot()
  })

  it('Should render correctly and logs button should navigate to correct screens', () => {
    const componentId = 'component1'
    const initialState = {}

    const store = mockStore(initialState)

    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <SettingsScreen componentId={componentId} />
      </Provider>,
    )

    fireEvent.press(getByTestId('Logs-button'))
    const push = Navigation.push as jest.Mock
    expect(push.mock.calls).toHaveLength(1)
    expect(push.mock.calls[0][1].component.name).toEqual(screens.LOG_VIEWER)

    expect(toJSON()).toMatchSnapshot()
  })
})
