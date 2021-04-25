import 'react-native'

import { fireEvent, render } from 'react-native-testing-library'

import React from 'react'
import SettingsRow from '../settingsRow'

describe('SettingsRow', () => {
  it('should render the row', () => {
    const title = 'The title'
    const onPress = jest.fn()

    const { getByTestId, toJSON } = render(
      <SettingsRow title={title} onPress={onPress} />,
    )

    expect(getByTestId('The title-button-label').props.children).toBe(
      title.toUpperCase(),
    )

    fireEvent.press(getByTestId('The title-button'))
    expect(onPress).toBeCalled()

    expect(toJSON()).toMatchSnapshot()
  })
})
