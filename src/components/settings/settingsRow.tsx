import React, { Component } from 'react'

import Button from '../buttons/button'
import { GestureResponderEvent } from 'react-native'
import PropTypes from 'prop-types'
import { SettingsRowStyles } from '../../theme/components/settings/settingsRow.style'

interface Props {
  title: string
  onPress: (event: GestureResponderEvent) => void
}

export default class SettingsRow extends Component<Props> {
  public static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
  }

  render() {
    const styles = SettingsRowStyles.normal

    return (
      <Button
        onPress={this.props.onPress}
        testID={`${this.props.title}-button`}
        label={this.props.title}
        style={styles.button}
      />
    )
  }
}
