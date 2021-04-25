import 'react-native'
import React from 'react'
import { Text } from 'react-native'
import { fireEvent, render } from 'react-native-testing-library'

import SingleTapButton from '../singleTapButton'

describe('SingleTapButton', () => {
  it('should render', () => {
    const testId = 'test-id'
    const children = <Text testID={testId}>Test</Text>
    const onPress = jest.fn()

    const { getByTestId, toJSON } = render(
      <SingleTapButton children={children} onPress={onPress} />,
    )

    fireEvent.press(getByTestId(testId))
    expect(onPress).toBeCalled()

    expect(getByTestId(testId).props.children).toBe('Test')

    expect(toJSON()).toMatchSnapshot()
  })
})
