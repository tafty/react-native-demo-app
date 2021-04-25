const SettingsScreen = require('../screens/settings.screen')
const DiagnosticsScreen = require('../screens/diagnostics.screen')

class NavigateToDiagnosticsFlow {
  constructor() {
    this.settingsScreen = SettingsScreen()
    this.diagnosticsScreen = DiagnosticsScreen()
  }

  async navigateToDiagnostics() {
    console.log('[Navigate To Diagnostics Flow] - Settings Screen is shown')
    await this.settingsScreen.toBeVisible()

    console.log('[Navigate To Diagnostics Flow] - Press Diagnostics')
    await this.settingsScreen.pressDiagnostics()

    console.log('[Login Flow] - Diagnostics Screen is shown')
    await this.diagnosticsScreen.toBeVisible()
  }
}

module.exports = NavigateToDiagnosticsFlow
