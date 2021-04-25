const LoginScreen = require('../screens/login.screen')
const HomeScreen = require('../screens/home.screen')

class LoginFlow {
  constructor() {
    this.loginScreen = LoginScreen()
    this.homeScreen = HomeScreen()
  }

  async login() {
    console.log('[Login Flow] - Login Screen is shown')
    await this.loginScreen.toBeVisible()

    console.log('[Login Flow] - Enter username')
    await this.loginScreen.enterUsername('bob')

    console.log('[Login Flow] - Enter password')
    await this.loginScreen.enterPassword('200')

    console.log('[Login Flow] - Press Login')
    await this.loginScreen.pressLogin()

    console.log('[Login Flow] - Home Screen is shown')
    await this.homeScreen.toBeVisible()
  }
}

module.exports = LoginFlow
