const HomeScreen = require('../screens/home.screen')
const SettingsScreen = require('../screens/settings.screen')

class NavigateToSettingsFlow {
  constructor() {
    this.homeScreen = HomeScreen()
    this.settingsScreen = SettingsScreen()
  }

  async navigateToSettings() {
    console.log('[Navigate To Settings Flow] - Home Screen is shown')
    await this.homeScreen.toBeVisible()

    console.log('[Navigate To Settings Flow] - Press Settings')
    await this.homeScreen.pressSettings()

    console.log('[Login Flow] - Settings Screen is shown')
    await this.settingsScreen.toBeVisible()
  }
}

module.exports = NavigateToSettingsFlow
