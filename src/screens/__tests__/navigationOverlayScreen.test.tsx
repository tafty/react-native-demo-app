import 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'

import configureStore from 'redux-mock-store'
import NavigationActionOverlayScreen from '../navigationActionOverlayScreen'

const middlewares: any[] = []
const mockStore = configureStore(middlewares)

describe('NavigationActionOverlayScreen Screen', () => {
  it('Should render', () => {
    jest.useFakeTimers()

    const initialState = {}

    const store = mockStore(initialState)

    const tree = renderer.create(
      <Provider store={store}>
        <NavigationActionOverlayScreen
          componentId="1243534"
          navigationActionId="abcd"
        />
      </Provider>,
    )

    expect(tree).toMatchSnapshot()
  })
})
