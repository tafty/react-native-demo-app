import * as R from 'ramda'

import {
  CommandCompletedEvent,
  EventSubscription,
  Navigation,
} from 'react-native-navigation'
import {
  EmitterSubscription,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import React, { Component } from 'react'

import Colors from '../../theme/colors'
import PropTypes from 'prop-types'

const TIME_OUT_MS = 500

interface IProps {
  androidBorderlessEffect?: boolean
  androidRippleColor?: string
  children: Element
  onPress: Function
  style?: ViewStyle
}

export default class SingleTapButton extends Component<IProps> {
  static propTypes = {
    androidBorderlessEffect: PropTypes.bool,
    androidRippleColor: PropTypes.string,
    children: PropTypes.any,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object,
  }

  commandCompletedListener: EmitterSubscription | undefined
  commandListener: EventSubscription | undefined
  canBePressed = true

  constructor(props: IProps) {
    super(props)

    this.canBePressed = true
  }

  componentDidMount() {
    this.commandListener = Navigation.events().registerCommandListener(
      (name, _params) => {
        if (
          !R.isNil(this) &&
          this.canBePressed &&
          name.toLowerCase() === 'push'
        ) {
          this.canBePressed = false
        }
      },
    )

    this.commandCompletedListener = Navigation.events().registerCommandCompletedListener(
      (_event: CommandCompletedEvent) => {
        if (!R.isNil(this) && !this.canBePressed) {
          setTimeout(() => {
            this.canBePressed = true
          }, TIME_OUT_MS)
        }
      },
    )
  }

  componentWillUnmount() {
    if (!R.isNil(this.commandListener)) {
      this.commandListener.remove()
    }

    if (!R.isNil(this.commandCompletedListener)) {
      this.commandCompletedListener.remove()
    }
  }

  _onPress = (original: any, ...args: any[]) => {
    return () => {
      if (this.canBePressed) {
        this.canBePressed = false
        setTimeout(() => {
          this.canBePressed = true
        }, TIME_OUT_MS)
        original(...args)
      }
    }
  }

  render() {
    let { androidBorderlessEffect, androidRippleColor } = this.props

    const androidBorderlessEffectSanitised: boolean = R.isNil(
      androidBorderlessEffect,
    )
      ? false
      : androidBorderlessEffect

    if (R.isNil(androidRippleColor)) {
      androidRippleColor = Colors.androidRippleColor
    }

    return Platform.select({
      ios: (
        <TouchableOpacity
          style={this.props.style}
          onPress={this._onPress(this.props.onPress)}
        >
          {this.props.children}
        </TouchableOpacity>
      ),
      android: (
        <TouchableNativeFeedback
          onPress={this._onPress(this.props.onPress)}
          useForeground={true}
          background={TouchableNativeFeedback.Ripple(
            androidRippleColor,
            androidBorderlessEffectSanitised,
          )}
        >
          <View style={this.props.style}>{this.props.children}</View>
        </TouchableNativeFeedback>
      ),
    })
  }
}
