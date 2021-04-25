import 'react-native'

import LoginInput from '../loginInput'
import React from 'react'
import { render } from 'react-native-testing-library'

describe('LoginInput', () => {
  it('should render as insecure', () => {
    const label = 'Email address'
    const onChangeText = jest.fn()
    const onSubmitEditing = jest.fn()
    const secureTextEntry = false
    const testID = 'test-ID'
    const value = 'email'

    const { getByTestId, toJSON } = render(
      <LoginInput
        label={label}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        testID={testID}
        value={value}
      />,
    )

    expect(getByTestId(`${testID}-input`).props.placeholder).toBe(label)
    expect(getByTestId(`${testID}-input`).props.value).toBe(value)

    expect(toJSON()).toMatchSnapshot()
  })

  it('should render as secure', () => {
    const label = 'Password'
    const onChangeText = jest.fn()
    const onSubmitEditing = jest.fn()
    const secureTextEntry = true
    const testID = 'test-ID'
    const value = 'password'

    const { getByTestId, toJSON } = render(
      <LoginInput
        label={label}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        testID={testID}
        value={value}
      />,
    )

    expect(getByTestId(`${testID}-input`).props.placeholder).toBe(label)
    expect(getByTestId(`${testID}-input`).props.value).toBe(value)

    expect(toJSON()).toMatchSnapshot()
  })
})
