/**
 * @format
 */

// import '@react-native-firebase/crashlytics'

import * as R from 'ramda'
import * as RNLocalize from 'react-native-localize'
// This import is enable/disable by utils/detox_helper.sh for Detox runs
// import { LogBox } from 'react-native'
import * as componentIds from './componentIds'
import * as screens from './screens/screens'

import {
  currentLocale,
  setI18nConfig,
  translate,
} from './localisation/translate'
import deviceLog, { InMemoryAdapter } from 'react-native-device-log'

import { AppState } from 'react-native'
import Colors from './theme/colors'
import { Navigation } from 'react-native-navigation'
import NetInfo from '@react-native-community/netinfo'
import Orientation from 'react-native-orientation-locker'
import { Provider } from 'react-redux'
import { createAction } from 'redux-actions'
import { createAction as createAppAction } from './actions/createAction'
import { getHasAppInitialised } from './selectors/app/getHasAppInitialised'
import { getIsAppActive } from './selectors/app/getIsAppActive'
import { getIsLoggedIn } from './selectors/security/getIsLoggedIn'
import { getIsLoginRequired } from './selectors/security/getIsLoginRequired'
import { getIsOnlineLoginRequired } from './selectors/security/getIsOnlineLoginRequired'
import { registerScreens } from './screens'
import sagas from './sagas'
import store from './store/store'
import uuid from 'uuid'

registerScreens(store, Provider)

store.runSaga!(sagas)

deviceLog.init(
  new InMemoryAdapter() /* You can send new InMemoryAdapter() if you do not want to persist here*/,
  {
    logToConsole: true, //Send logs to console as well as device-log
    logRNErrors: true, // Will pick up RN-errors and send them to the device log
    maxNumberToRender: 500, // 0 or undefined == unlimited
    maxNumberToPersist: 500, // 0 or undefined == unlimited
  },
)

const connectionChangedAction = createAction('NetworkStatusUpdate')

export default class App {
  hasAppInitialised: boolean = false
  isActive?: boolean
  isLoggedIn?: boolean
  loginComponentId?: string

  constructor() {
    AppState.addEventListener('change', this._handleAppStateChange)
    AppState.addEventListener('memoryWarning', this._handleMemoryWarning)

    store.subscribe(this._onStoreUpdate)
    store.dispatch(createAppAction('StartUp', {}))

    NetInfo.fetch().then(state => this._handleConnectionChanged(state))
    NetInfo.addEventListener(state => this._handleConnectionChanged(state))

    setI18nConfig()

    RNLocalize.addEventListener('change', this._handleLocalizationChange)

    Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setDefaultOptions({
        animations: {
          setRoot: {
            waitForRender: true,
          },
          showModal: {
            waitForRender: true,
          },
          push: {
            waitForRender: true,
          },
        },
        topBar: {
          visible: true,
          background: {
            color: Colors.topBarBackgroundColor,
          },
        },
      })

      store.dispatch(createAppAction('AppInitialised', {}))

      this._setRoot()
    })

    Orientation.lockToPortrait()

    // This statement is enable/disable by utils/detox_helper.sh for Detox runs
    // LogBox.ignoreAllLogs()
  }

  _setRoot = () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: screens.HOME,
              },
            },
          ],
        },
      },
    })
  }

  _handleConnectionChanged = (state: any) => {
    store.dispatch(
      connectionChangedAction({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
      }),
    )
  }

  _handleAppStateChange = (state: any) => {
    if (state.toLowerCase().match(/inactive|background/)) {
      this._appIsInActive()
    } else {
      this._appIsActive()
    }
  }

  _handleLocalizationChange = () => {
    setI18nConfig()
    store.dispatch(
      createAppAction('LocalisationChanged', { locale: currentLocale() }),
    )
  }

  _appIsInActive = () => {
    if (this.isActive) {
      if (!R.isNil(this.loginComponentId)) {
        Navigation.dismissOverlay(this.loginComponentId)
        this.loginComponentId = undefined
      }

      store.dispatch(createAppAction('AppInactive', {}))
    }
  }

  _appIsActive = () => {
    if (!this.isActive) {
      store.dispatch(createAppAction('AppActive', {}))
    }
  }

  _handleMemoryWarning = () => {
    deviceLog.debug('APP STATE', 'Received a MEMORY warning')
  }

  _onStoreUpdate = () => {
    const state = store.getState()

    const hasAppInitialised = getHasAppInitialised(state)
    const isActive = getIsAppActive(state)
    const isLoggedIn = getIsLoggedIn(state)

    if (
      hasAppInitialised === this.hasAppInitialised &&
      isLoggedIn === this.isLoggedIn &&
      this.isActive === isActive
    ) {
      return
    }

    if (hasAppInitialised) {
      const isLoginRequired = getIsLoginRequired(state)
      if (!isLoggedIn && isLoginRequired) {
        const isOnlineLoginRequired = getIsOnlineLoginRequired(state)
        this._showLoginScreen(isOnlineLoginRequired)
      } else if (isLoggedIn && !R.isNil(this.loginComponentId)) {
        Navigation.dismissOverlay(this.loginComponentId)
        this.loginComponentId = undefined
      }
    }

    this.hasAppInitialised = hasAppInitialised
    this.isLoggedIn = isLoggedIn
    this.isActive = isActive
  }

  _showLoginScreen = (isOnlineLoginRequired: boolean) => {
    if (!R.isNil(this.loginComponentId)) {
      try {
        Navigation.dismissOverlay(this.loginComponentId)
      } catch (e) {
        // On Android the actual component referred to by this.loginComponentId sometimes does not exist - ignore this crash and carry on
      }
    }

    // componentId has a UUID appended as RNN will only dismiss an overlay with a given id once
    this.loginComponentId = componentIds.LOGIN + '.' + uuid.v4()

    const orientation: any = 'portrait'

    Navigation.showOverlay({
      component: {
        id: this.loginComponentId,
        name: screens.LOGIN,
        passProps: {
          isOnlineLoginRequired,
        },
        options: {
          layout: {
            orientation,
          },
          topBar: {
            title: {
              text: translate('login'),
            },
          },
        },
      },
    })
  }
}
