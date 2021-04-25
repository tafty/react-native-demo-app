import * as R from 'ramda'

import React, { Component } from 'react'
import { TextInput, View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { LoginInputStyles } from '../../theme/components/login/loginInput.style'
import PropTypes from 'prop-types'

const ICON_SIZE = 20

interface Props {
  label: string
  onChangeText: Function
  onSubmitEditing?: Function
  secureTextEntry: boolean
  style?: any
  testID: string
  value: string
}

interface State {
  isSecure: boolean
}

export default class LoginInput extends Component<Props, State> {
  static propTypes = {
    label: PropTypes.string,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    showSecureSwitch: PropTypes.bool,
    style: PropTypes.any,
    testID: PropTypes.string,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isSecure: props.secureTextEntry,
    }
  }

  _switchSecure = () => {
    this.setState({ isSecure: !this.state.isSecure })
  }

  _onChangeText = (text: string) => {
    const { onChangeText } = this.props
    if (!R.isNil(onChangeText)) {
      onChangeText(text)
    }
  }

  _onSubmitEditing = () => {
    const { onSubmitEditing } = this.props
    if (!R.isNil(onSubmitEditing)) {
      onSubmitEditing()
    }
  }

  render() {
    const styles = LoginInputStyles.normal
    const { label, secureTextEntry, style, testID, value } = this.props
    const { isSecure } = this.state
    const secureSwitchIcon = isSecure ? 'md-eye' : 'md-eye-off'

    return (
      <View style={[style, styles.container]}>
        <View>
          <TextInput
            autoCapitalize={'none'}
            onChangeText={this._onChangeText}
            onSubmitEditing={this._onSubmitEditing}
            placeholder={label}
            secureTextEntry={isSecure}
            style={styles.textInput}
            testID={`${testID}-input`}
            value={value}
          />
          {secureTextEntry && (
            <Icon
              style={styles.iconRight}
              name={secureSwitchIcon}
              onPress={this._switchSecure}
              size={ICON_SIZE}
            />
          )}
        </View>
      </View>
    )
  }
}
