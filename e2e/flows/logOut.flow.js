const LoginScreen = require('../screens/login.screen')
const HomeScreen = require('../screens/home.screen')

class LoginFlow {
  constructor() {
    this.loginScreen = LoginScreen()
    this.homeScreen = HomeScreen()
  }

  async logOut() {
    console.log('[Log Out Flow] - Home Screen is shown')
    await this.homeScreen.toBeVisible()

    console.log('[Log Out Flow] - Press Log Out')
    await this.homeScreen.pressLogOut()

    console.log('[Log Out Flow] - Login Screen is shown')
    await this.loginScreen.toBeVisible()
  }
}

module.exports = LoginFlow
