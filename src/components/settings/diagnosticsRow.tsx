import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { DiagnosticsRowStyles } from '../../theme/components/settings/diagnosticsRow.style'
import PropTypes from 'prop-types'

type DiagnosticsRowProps = {
  title: string
  value: string
}

type DiagnosticsRowState = {}

export default class DiagnosticsRow extends Component<
  DiagnosticsRowProps,
  DiagnosticsRowState
> {
  public static propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
  }

  render() {
    const styles = DiagnosticsRowStyles.normal
    return (
      <View style={styles.row}>
        <Text testID={`${this.props.title}-title`} style={styles.title}>
          {this.props.title}
        </Text>
        <Text testID={`${this.props.title}-value`} style={styles.value}>
          {this.props.value}
        </Text>
      </View>
    )
  }
}
