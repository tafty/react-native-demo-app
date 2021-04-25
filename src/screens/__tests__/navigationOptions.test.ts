import { NavigationOptions } from '../navigationOptions'

describe('Navigation Options', () => {
  it('should set the orientation to portrait by default when created', () => {
    const navigationOptions = NavigationOptions.createNavigationOptions()

    expect(navigationOptions.options).toEqual({
      animations: {
        setRoot: {
          waitForRender: true,
        },
        showModal: {
          waitForRender: true,
        },
        push: {
          waitForRender: true,
        },
      },
      layout: {
        orientation: ['portrait'],
      },
      topBar: {
        drawBehind: true,
        visible: false,
        leftButtonColor: 'rgba(0, 0, 0, 1)',
        rightButtonColor: 'rgba(0, 0, 0, 1)',
        backButton: {
          color: 'rgba(0, 0, 0, 1)',
        },
      },
    })
  })

  it('should set to allow any orientation if fix to portrait is overridden when created', () => {
    const navigationOptions = NavigationOptions.createNavigationOptions(false)

    expect(navigationOptions.options).toEqual({
      animations: {
        setRoot: {
          waitForRender: true,
        },
        showModal: {
          waitForRender: true,
        },
        push: {
          waitForRender: true,
        },
      },
      layout: {
        orientation: ['portrait', 'landscape'],
      },
      topBar: {
        drawBehind: true,
        visible: false,
        leftButtonColor: 'rgba(0, 0, 0, 1)',
        rightButtonColor: 'rgba(0, 0, 0, 1)',
        backButton: {
          color: 'rgba(0, 0, 0, 1)',
        },
      },
    })
  })

  it('should add a title', () => {
    const navigationOptions = NavigationOptions.createNavigationOptions().addTitle(
      'The Title',
    )

    expect(navigationOptions.options).toEqual({
      animations: {
        setRoot: {
          waitForRender: true,
        },
        showModal: {
          waitForRender: true,
        },
        push: {
          waitForRender: true,
        },
      },
      layout: {
        orientation: ['portrait'],
      },
      topBar: {
        leftButtonColor: 'rgba(0, 0, 0, 1)',
        rightButtonColor: 'rgba(0, 0, 0, 1)',
        backButton: {
          color: 'rgba(0, 0, 0, 1)',
        },
        drawBehind: false,
        visible: true,
        title: {
          text: 'The Title',
        },
      },
    })
  })
})
