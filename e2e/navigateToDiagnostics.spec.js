const detox = require('detox')

const LoginFlow = require('./flows/login.flow')
const NavigateToDiagnosticsFlow = require('./flows/navigateToDiagnostics.flow')
const NavigateToSettingsFlow = require('./flows/navigateToSettings.flow')

describe('Navigate to Diagnostics Screen', () => {
  before(async () => {
    await device.uninstallApp()
    await device.installApp()
    await device.launchApp({
      newInstance: true,
      permissions: { camera: 'YES' },
    })
  })

  after(async () => {})

  it('should login', async () => {
    const flow = new LoginFlow()
    await flow.login()
  })

  it('should navigate to the Settings screen', async () => {
    const flow = new NavigateToSettingsFlow()
    await flow.navigateToSettings()
  })

  it('should navigate to the Diagnostics screen', async () => {
    const flow = new NavigateToDiagnosticsFlow()
    await flow.navigateToDiagnostics()
  })
})
