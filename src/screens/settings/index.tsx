import * as screens from '../screens'

import { ICreateAction, createAction } from '../../actions/createAction'
import React, { Component } from 'react'

import { Navigation } from 'react-native-navigation'
import { NavigationOptions } from '../navigationOptions'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-native'
import SettingsList from '../../components/settings/settingsList'
import { SettingsListOption } from '../../components/settings/settingsList'
import { SettingsScreenStyles } from '../../theme/screens/settings/index.style'
import { connect } from 'react-redux'
import { translate } from '../../localisation/translate'

interface IPassedProps {
  componentId: string
}

interface IMappedProps {}

interface IActionProps {
  createAction: ICreateAction
}

interface IProps extends IPassedProps, IMappedProps, IActionProps {}

type State = {
  options: Array<SettingsListOption> | null | undefined
}

class SettingsScreen extends Component<IProps, State> {
  public static propTypes = {
    componentId: PropTypes.string.isRequired,
  }

  static options() {
    return NavigationOptions.createNavigationOptions().addTitle(
      translate('settings'),
    ).options
  }

  state: State = { options: null }

  constructor(props: Readonly<IProps>) {
    super(props)

    const options = [
      {
        icon: 'md-information-circle',
        title: 'Diagnostics',
        onPress: () => this._navigateToScreen(screens.DIAGNOSTICS),
      },
      {
        icon: 'md-list-box',
        title: 'Logs',
        onPress: () => this._navigateToScreen(screens.LOG_VIEWER),
      },
    ]

    if (__DEV__) {
      options.push({
        icon: 'md-book',
        title: 'Storybook',
        onPress: () => this._navigateToScreen(screens.STORYBOOK),
      })
    }

    this.state = {
      options,
    }
  }

  _navigateToScreen = (screen: string) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screen,
      },
    })
  }

  _onPressBack = () => {
    Navigation.pop(this.props.componentId)
  }

  render = () => {
    const styles = SettingsScreenStyles.normal

    return (
      <SafeAreaView style={styles.container}>
        <SettingsList options={this.state.options} />
      </SafeAreaView>
    )
  }
}

const actions = {
  createAction,
}

function mapStateToProps(): IMappedProps {
  return {}
}

export default connect(mapStateToProps, actions)(SettingsScreen)
