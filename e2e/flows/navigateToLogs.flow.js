const SettingsScreen = require('../screens/settings.screen')
const LogViewerScreen = require('../screens/logViewer.screen')

class NavigateToLogsFlow {
  constructor() {
    this.settingsScreen = SettingsScreen()
    this.logViewerScreen = LogViewerScreen()
  }

  async navigateToLogs() {
    console.log('[Navigate To Logs Flow] - Settings Screen is shown')
    await this.settingsScreen.toBeVisible()

    console.log('[Navigate To Logs Flow] - Press Logs')
    await this.settingsScreen.pressLogs()

    console.log('[Login Flow] - Log Viewer Screen is shown')
    await this.logViewerScreen.toBeVisible()
  }
}

module.exports = NavigateToLogsFlow
