import { ActivityIndicator, Text, View } from 'react-native'
import React, { Component } from 'react'

import { ButtonStyles } from '../../theme/components/buttons/button.style'
import PropTypes from 'prop-types'
import SingleTapButton from './singleTapButton'

interface IProps {
  isDisabled?: boolean
  label: string
  onPress: Function
  showActivityIndicator?: boolean
  style?: any
  testID: string
}

export default class Button extends Component<IProps> {
  static propTypes = {
    isDisabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    showActivityIndicator: PropTypes.bool,
    style: PropTypes.any,
    testID: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }

  render() {
    const {
      isDisabled,
      label,
      onPress,
      showActivityIndicator,
      style,
      testID,
    } = this.props

    const styles = isDisabled ? ButtonStyles.disabled : ButtonStyles.normal

    let text

    if (showActivityIndicator) {
      text = <ActivityIndicator style={styles.icon} size="small" />
    } else {
      text = label.toUpperCase()
    }

    if (isDisabled) {
      return (
        <View style={style}>
          <View style={styles.container}>
            <Text testID={`${testID}-label`} style={styles.label}>
              {text}
            </Text>
          </View>
        </View>
      )
    }

    return (
      <SingleTapButton onPress={onPress} style={style}>
        <View testID={testID} style={styles.container}>
          <Text testID={`${testID}-label`} style={styles.label}>
            {text}
          </Text>
        </View>
      </SingleTapButton>
    )
  }
}
