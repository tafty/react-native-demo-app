import 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { render, fireEvent } from 'react-native-testing-library'

import Button from '../button'

describe('Button', () => {
  it('should render enabled', () => {
    const isDisabled = false
    const onPress = jest.fn()
    const testID = 'test-id'
    const label = 'photos'

    const { getByTestId, toJSON } = render(
      <Button
        isDisabled={isDisabled}
        onPress={onPress}
        testID={testID}
        label={label}
      />,
    )

    expect(getByTestId(`${testID}-label`).props.children).toBe(
      label.toUpperCase(),
    )

    fireEvent.press(getByTestId(testID))
    expect(onPress).toBeCalled()

    expect(toJSON()).toMatchSnapshot()
  })

  it('should render disabled', () => {
    const isDisabled = true
    const onPress = jest.fn()
    const testID = 'test-id'
    const label = 'photos'

    const { getByTestId, toJSON } = render(
      <Button
        isDisabled={isDisabled}
        onPress={onPress}
        testID={testID}
        label={label}
      />,
    )

    expect(getByTestId(`${testID}-label`).props.children).toBe(
      label.toUpperCase(),
    )

    expect(toJSON()).toMatchSnapshot()
  })

  it('should render enabled with an activity indicator', () => {
    const isDisabled = false
    const onPress = jest.fn()
    const testID = 'test-id'
    const label = 'photos'

    const { getByTestId, toJSON } = render(
      <Button
        isDisabled={isDisabled}
        onPress={onPress}
        showActivityIndicator={true}
        testID={testID}
        label={label}
      />,
    )

    const style = { color: '#343a40', flex: 0, marginRight: 8 }

    const indicator = (
      <ActivityIndicator
        animating={true}
        color="#999999"
        hidesWhenStopped={true}
        size="small"
        style={style}
      />
    )

    expect(getByTestId(`${testID}-label`).props.children.toString()).toBe(
      indicator.toString(),
    )

    fireEvent.press(getByTestId(testID))
    expect(onPress).toBeCalled()

    expect(toJSON()).toMatchSnapshot()
  })

  it('should render disabled with an activity indicator', () => {
    const isDisabled = true
    const onPress = jest.fn()
    const testID = 'test-id'
    const label = 'photos'

    const { getByTestId, toJSON } = render(
      <Button
        isDisabled={isDisabled}
        onPress={onPress}
        showActivityIndicator={true}
        testID={testID}
        label={label}
      />,
    )

    const style = { color: '#343a40', flex: 0, marginRight: 8 }

    const indicator = (
      <ActivityIndicator
        animating={true}
        color="#999999"
        hidesWhenStopped={true}
        size="small"
        style={style}
      />
    )

    expect(getByTestId(`${testID}-label`).props.children.toString()).toBe(
      indicator.toString(),
    )

    expect(toJSON()).toMatchSnapshot()
  })
})
