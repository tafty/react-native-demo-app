import Colors from '../theme/colors'

export class NavigationOptions {
  options: any

  static createNavigationOptions(fixToPortrait: boolean = true) {
    const navigationOptions: NavigationOptions = new NavigationOptions()

    if (fixToPortrait) {
      navigationOptions.options = {
        layout: {
          orientation: ['portrait'],
        },
      }
    } else {
      navigationOptions.options = {
        layout: {
          orientation: ['portrait', 'landscape'],
        },
      }
    }

    navigationOptions.options.animations = {
      setRoot: {
        waitForRender: true,
      },
      showModal: {
        waitForRender: true,
      },
      push: {
        waitForRender: true,
      },
    }

    navigationOptions.options.topBar = {
      drawBehind: true,
      visible: false,
      leftButtonColor: Colors.topBarButtons,
      rightButtonColor: Colors.topBarButtons,
      backButton: {
        color: Colors.topBarButtons,
      },
    }

    return navigationOptions
  }

  addTitle(title: string) {
    if (!this.options.topBar) {
      this.options.topBar = {}
    }

    this.options.topBar.drawBehind = false
    this.options.topBar.visible = true

    if (!this.options.topBar.title) {
      this.options.topBar.title = {}
    }

    this.options.topBar.title.text = title

    return this
  }
}
