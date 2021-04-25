import React from 'react'
import ScreenBorder from '../../../decorators/ScreenBorder'
import SettingsList from '../../../../src/components/settings/settingsList'
import { storiesOf } from '@storybook/react-native'

storiesOf('Settings List', module)
  .addDecorator((getStory: Function) => (
    <ScreenBorder>{getStory()}</ScreenBorder>
  ))
  .add('Single Row', () => {
    const options = [
      {
        title: 'Diagnostics',
        onPress: () => console.log('PRESSED DIAGNOSTICS'),
      },
    ]

    return <SettingsList options={options} />
  })
  .add('Multiple Rows', () => {
    const options = [
      {
        title: 'Diagnostics',
        onPress: () => console.log('PRESSED DIAGNOSTICS'),
      },
      {
        title: 'Logs',
        onPress: () => console.log('PRESSED LOGS'),
      },
    ]

    return <SettingsList options={options} />
  })
