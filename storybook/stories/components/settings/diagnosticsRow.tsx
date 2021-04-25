import DiagnosticsRow from '../../../../src/components/settings/diagnosticsRow'
import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'

storiesOf('Diagnostics Row', module).add('Diagnostics Row', () => {
  return (
    <View>
      <DiagnosticsRow title="App Version" value="1.0.1" />
    </View>
  )
})
