import React from 'react'
import { Navigation } from 'react-native-navigation'

import HomeScreen from './homeScreen'
import LoginScreen from './loginScreen'
import DiagnosticsScreen from './settings/diagnosticsScreen'
import LogViewerScreen from './settings/logViewerScreen'
import NavigationActionOverlayScreen from './navigationActionOverlayScreen'
import SettingsScreen from './settings/'
import StorybookScreen from './settings/storybook'

import * as screens from './screens'

function registerScreenWithRedux(
  screenName: string,
  ReduxScreen: React.ComponentType<any>,
  store: Object,
  Provider: React.ComponentType<any>,
) {
  Navigation.registerComponent(
    screenName,
    () => props => (
      <Provider store={store}>
        <ReduxScreen {...props} />
      </Provider>
    ),
    () => ReduxScreen,
  )
}

export function registerScreens(
  store: Object,
  provider: React.ComponentType<any>,
) {
  registerScreenWithRedux(
    screens.DIAGNOSTICS,
    DiagnosticsScreen,
    store,
    provider,
  )
  registerScreenWithRedux(screens.HOME, HomeScreen, store, provider)
  registerScreenWithRedux(screens.LOGIN, LoginScreen, store, provider)
  registerScreenWithRedux(screens.LOG_VIEWER, LogViewerScreen, store, provider)
  registerScreenWithRedux(
    screens.NAVIGATION_ACTION_OVERLAY,
    NavigationActionOverlayScreen,
    store,
    provider,
  )
  registerScreenWithRedux(screens.SETTINGS, SettingsScreen, store, provider)
  registerScreenWithRedux(screens.STORYBOOK, StorybookScreen, store, provider)
}
