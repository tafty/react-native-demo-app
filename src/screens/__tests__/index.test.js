/* globals jest */

import { Navigation } from 'react-native-navigation'
import { registerScreens } from '../index'

const SCREEN_COUNT = 7

describe('Register Screens', () => {
  it('should register all screens', () => {
    const registerComponentMock = jest.fn()
    Navigation.registerComponent = registerComponentMock
    registerScreens({}, () => {})

    expect(Navigation.registerComponent).toHaveBeenCalledTimes(SCREEN_COUNT)
  })
})
