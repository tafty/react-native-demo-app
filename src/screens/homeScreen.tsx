import * as screens from './screens'

import React, { Component } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'

import type { ApplicationState } from '../reducers'
import Button from '../components/buttons/button'
import { HomeScreenStyles } from '../theme/screens/homeScreen.style'
import { Navigation } from 'react-native-navigation'
import { NavigationOptions } from './navigationOptions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAction } from '../actions/createAction'
import { getConnectionType } from '../selectors/networkConnection/getConnectionType'
import { getIsConnected } from '../selectors/networkConnection/getIsConnected'
import { getIsInternetReachable } from '../selectors/networkConnection/getIsInternetReachable'
import { getRealmPath } from '../selectors/realm/getRealmPath'
import { translate } from '../localisation/translate'

interface IPassedProps {
  componentId: string
}

interface IMappedProps {
  connectionType: string | undefined
  isConnected: boolean
  isInternetReachable: boolean | undefined | null
  realmPath: string
}

interface IActionProps {
  createAction: Function
}

interface IProps extends IPassedProps, IMappedProps, IActionProps {}

class HomeScreen extends Component<IProps> {
  static options() {
    return NavigationOptions.createNavigationOptions().addTitle(
      translate('home'),
    ).options
  }

  public static propTypes = {
    componentId: PropTypes.string.isRequired,
    connectionType: PropTypes.string,
    isConnected: PropTypes.bool.isRequired,
    isInternetReachable: PropTypes.bool,
    createAction: PropTypes.func.isRequired,
    realmPath: PropTypes.string.isRequired,
  }

  _logOutStarted = () => {
    this.props.createAction('LogOutStarted')
  }

  _navigateToSettings = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screens.SETTINGS,
      },
    })
  }

  render() {
    const {
      isConnected,
      isInternetReachable,
      connectionType,
      realmPath,
    } = this.props

    const yes = translate('yes')
    const no = translate('no')

    const styles = HomeScreenStyles.normal

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text testID="is_network_connected">
            {translate('is_network_connected')}: {isConnected ? yes : no}
          </Text>
          <Text testID="is_internet_reachable">
            {translate('is_internet_reachable')}
            {': '}
            {isInternetReachable ? yes : no}
          </Text>
          <Text testID="network_connection_type">
            {translate('network_connection_type')}: {connectionType}
          </Text>
          <Text testID="current_realm_path">
            {translate('current_realm_path')}: {realmPath}
          </Text>
          <Button
            onPress={this._navigateToSettings}
            testID="settings-button"
            label={translate('settings')}
            style={styles.button}
          />
          <Button
            onPress={this._logOutStarted}
            testID="log-out-button"
            label={translate('log_out')}
            style={styles.button}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const actions = {
  createAction,
}

function mapStateToProps(state: ApplicationState): IMappedProps {
  return {
    isConnected: getIsConnected(state),
    isInternetReachable: getIsInternetReachable(state),
    connectionType: getConnectionType(state),
    realmPath: getRealmPath(state),
  }
}

export default connect(mapStateToProps, actions)(HomeScreen)
