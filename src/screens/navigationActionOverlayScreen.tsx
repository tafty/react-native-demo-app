import * as R from 'ramda'
import React, { Component } from 'react'
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Navigation } from 'react-native-navigation'
import * as componentIds from '../componentIds'

import NavigationActionHelper from './navigationActionHelper'

import { NavigationActionOverlayScreenStyles } from '../theme/screens/navigationActionOverlayScreen.style'

const OVERLAY_SHOWS_AFTER_MILLISECONDS = 500
const ERROR_SHOWS_AFTER_MILLISECONDS = 60000

interface IPassedProps {
  componentId: string
  error?: string
  navigationActionId: string
}

interface IMappedProps {}

interface IActionProps {}

interface IProps extends IPassedProps, IMappedProps, IActionProps {}

interface State {
  waitIsSet: boolean
  isLongWait: boolean
}

class NavigationActionOverlayScreen extends Component<IProps, State> {
  timeout?: NodeJS.Timeout
  failureTimeout?: NodeJS.Timeout

  public static propTypes = {
    componentId: PropTypes.string.isRequired,
    error: PropTypes.string,
    navigationActionId: PropTypes.string.isRequired,
  }

  constructor(props: Readonly<IProps>) {
    super(props)

    Navigation.events().bindComponent(this)

    this.state = {
      waitIsSet: false,
      isLongWait: false,
    }
  }

  componentDidAppear() {
    if (!this.state.waitIsSet) {
      this.setState({ waitIsSet: true })
      this.timeout = setTimeout(
        () => this.setState({ isLongWait: true }),
        OVERLAY_SHOWS_AFTER_MILLISECONDS,
      )
      this.failureTimeout = setTimeout(
        () => this._timedOut(),
        ERROR_SHOWS_AFTER_MILLISECONDS,
      )
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    if (this.failureTimeout) {
      clearTimeout(this.failureTimeout)
    }
  }

  _timedOut() {
    const { error, navigationActionId } = this.props
    // If the navigation overlay has been displayed for more than a minute then something has more than likely gone wrong...
    // ...dismiss the screen...
    try {
      Navigation.dismissOverlay(componentIds.NAVIGATION_ACTION_OVERLAY)
    } catch (e) {}
    // ...cancel the navigation event...

    NavigationActionHelper.complete(navigationActionId)
    /// ...and inform the user
    let message = `Action id: ${navigationActionId}`

    if (!R.isNil(error) && !R.isEmpty(error)) {
      message = error
    }

    Alert.alert('Navigation Time Out', message, [{ text: 'OK' }])
  }

  _renderActivityIndicator = (styles: any) => {
    if (!this.state.isLongWait) {
      return <View />
    }

    return <ActivityIndicator style={styles.activityIndicator} size="large" />
  }

  render() {
    const styles = NavigationActionOverlayScreenStyles.normal
    const scrollContainerStyle = this.state.isLongWait
      ? styles.scrollContainerDark
      : styles.scrollContainer

    return (
      <ScrollView style={scrollContainerStyle}>
        <View style={styles.container}>
          {this._renderActivityIndicator(styles)}
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(): IMappedProps {
  return {}
}

const actions = {}

export default connect(mapStateToProps, actions)(NavigationActionOverlayScreen)
