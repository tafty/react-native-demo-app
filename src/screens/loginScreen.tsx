import * as R from 'ramda'

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native'
import { ICreateAction, createAction } from '../actions/createAction'
import React, { Component } from 'react'

import type { ApplicationState } from '../reducers'
import Button from '../components/buttons/button'
import LoginInput from '../components/login/loginInput'
import { LoginScreenStyles } from '../theme/screens/loginScreen.style'
import { NavigationOptions } from './navigationOptions'
import PropTypes from 'prop-types'
import ResponseError from '../models/internal/responseError'
import { connect } from 'react-redux'
import { getIsAuthenticating } from '../selectors/security/getIsAuthenticating'
import { getIsConnected } from '../selectors/networkConnection/getIsConnected'
import { getIsInternetReachable } from '../selectors/networkConnection/getIsInternetReachable'
import { getIsOfflineLoginEnabled } from '../selectors/security/getIsOfflineLoginEnabled'
import { getIsOnlineLoginRequired } from '../selectors/security/getIsOnlineLoginRequired'
import { getSecurityError } from '../selectors/security/getSecurityError'
import { getUsername } from '../selectors/security/getUsername'
import moment from 'moment'
import { translate } from '../localisation/translate'

interface IPassedProps {
  componentId: string
}

interface IMappedProps {
  error?: ResponseError | undefined
  isAuthenticating: boolean
  isConnected: boolean
  isInternetReachable: boolean | undefined | null
  isOfflineLoginEnabled: boolean
  isOnlineLoginRequired: boolean
  username?: string | undefined
}

interface IActionProps {
  createAction: ICreateAction
}

interface IProps extends IPassedProps, IMappedProps, IActionProps {}

type State = {
  password: string
  username: string
}

class LoginScreen extends Component<IProps, State> {
  static options() {
    return NavigationOptions.createNavigationOptions().addTitle(
      translate('login'),
    ).options
  }

  public static propTypes = {
    componentId: PropTypes.string.isRequired,
    error: PropTypes.instanceOf(ResponseError),
    isAuthenticating: PropTypes.bool.isRequired,
    isConnected: PropTypes.bool.isRequired,
    isInternetReachable: PropTypes.bool,
    isOnlineLoginRequired: PropTypes.bool.isRequired,
    isOfflineLoginEnabled: PropTypes.bool.isRequired,
    createAction: PropTypes.func.isRequired,
    username: PropTypes.string,
  }

  constructor(props: Readonly<IProps>) {
    super(props)

    const username: string = R.isNil(this.props.username)
      ? ''
      : this.props.username

    this.state = {
      password: '',
      username,
    }
  }

  _isLoginButtonDisabled = () => {
    const {
      isAuthenticating,
      isConnected,
      isInternetReachable,
      isOfflineLoginEnabled,
      isOnlineLoginRequired,
    } = this.props

    const password = this.state.password
    const username = this.state.username

    if (isAuthenticating) {
      return true
    }

    if (R.isNil(password) || R.isEmpty(password)) {
      return true
    }

    if (R.isNil(username) || R.isEmpty(username)) {
      return true
    }

    if (!isConnected || !isInternetReachable) {
      if (isOnlineLoginRequired) {
        return true
      }

      if (!isOfflineLoginEnabled) {
        return true
      }
    }

    return false
  }

  _login = () => {
    this.props.createAction('LoginStarted', {
      username: this.state.username,
      password: this.state.password,
    })
  }

  _onChangePassword = (value: string) => {
    if (typeof value !== 'string') {
      return
    }

    if (R.isNil(value)) {
      value = ''
    }

    this.setState({ password: value })
  }

  _onChangeUsername = (value: string) => {
    if (typeof value !== 'string') {
      return
    }

    if (R.isNil(value)) {
      value = ''
    }

    this.setState({ username: value })
  }

  _onPressForgotPassword = () => {
    Alert.alert('Forgot password', 'Not yet implemented')
  }

  render() {
    const {
      error,
      isAuthenticating,
      isConnected,
      isInternetReachable,
      isOnlineLoginRequired,
    } = this.props

    const hasError = !R.isNil(error)
    // @ts-ignore ramda ensures that error is valid
    const errorMessage = hasError ? error.message : ''
    // @ts-ignore ramda ensures that error is valid
    const errorStatus = hasError ? error.status : ''
    const isLoginButtonDisabled = this._isLoginButtonDisabled()
    const isNetworkErrorVisible =
      isOnlineLoginRequired && (!isConnected || !isInternetReachable)

    const styles = LoginScreenStyles.normal

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
            <Text style={styles.title}>{translate('login').toUpperCase()}</Text>
            <Text style={styles.instructions}>{translate('instructions')}</Text>
            <LoginInput
              label={translate('username')}
              onChangeText={this._onChangeUsername}
              secureTextEntry={false}
              testID="username"
              value={this.state.username}
            />
            <LoginInput
              label={translate('password')}
              onChangeText={this._onChangePassword}
              secureTextEntry={true}
              style={styles.passwordInput}
              testID="password"
              value={this.state.password}
            />
            <Button
              isDisabled={isLoginButtonDisabled}
              onPress={this._login}
              showActivityIndicator={isAuthenticating}
              style={styles.loginButton}
              testID="login-button"
              label={translate('login')}
            />
            {hasError && (
              <Text style={styles.error} testID="error_message">
                {translate(errorMessage, { status: errorStatus })}
              </Text>
            )}
            {isNetworkErrorVisible && (
              <Text style={styles.network} testID="is_network_connected">
                {translate('no_internet_connection')}
              </Text>
            )}
            <Text
              onPress={this._onPressForgotPassword}
              style={styles.forgotPassword}
              testID="forgot_password"
            >
              {translate('forgot_password')}
            </Text>
            <Text style={styles.copyright}>
              {translate('copyright', {
                year: moment().format('YYYY'),
              })}
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

const actions: IActionProps = {
  createAction,
}

function mapStateToProps(state: ApplicationState): IMappedProps {
  return {
    error: getSecurityError(state),
    isAuthenticating: getIsAuthenticating(state),
    isConnected: getIsConnected(state),
    isInternetReachable: getIsInternetReachable(state),
    isOfflineLoginEnabled: getIsOfflineLoginEnabled(state),
    isOnlineLoginRequired: getIsOnlineLoginRequired(state),
    username: getUsername(state),
  }
}

export default connect(mapStateToProps, actions)(LoginScreen)
