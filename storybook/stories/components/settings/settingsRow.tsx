import React from 'react'
import ScreenBorder from '../../../decorators/ScreenBorder'
import { ScrollView } from 'react-native'
import SettingsRow from '../../../../src/components/settings/settingsRow'
import { storiesOf } from '@storybook/react-native'

storiesOf('Settings Rows', module)
  .addDecorator((getStory: Function) => (
    <ScreenBorder>{getStory()}</ScreenBorder>
  ))
  .add('Settings Row', () => {
    return (
      <ScrollView>
        <SettingsRow
          title="Diagnostics"
          onPress={() => console.log('PRESSED')}
        />
      </ScrollView>
    )
  })
