import 'react-native'

import { fireEvent, render } from 'react-native-testing-library'

import React from 'react'
import SettingsList from '../settingsList'

describe('SettingsList', () => {
  it('should render the row', () => {
    const onPress1 = jest.fn()
    const onPress2 = jest.fn()

    const options = [
      {
        onPress: onPress1,
        title: 'title1',
      },
      {
        onPress: onPress2,
        title: 'title2',
      },
    ]

    const { getByTestId, toJSON } = render(<SettingsList options={options} />)

    expect(getByTestId('title1-button-label').props.children).toBe(
      options[0].title.toUpperCase(),
    )
    expect(getByTestId('title2-button-label').props.children).toBe(
      options[1].title.toUpperCase(),
    )

    fireEvent.press(getByTestId('title1-button'))
    expect(onPress1).toBeCalledWith()

    fireEvent.press(getByTestId('title2-button'))
    expect(onPress2).toBeCalledWith()

    expect(toJSON()).toMatchSnapshot()
  })
})
