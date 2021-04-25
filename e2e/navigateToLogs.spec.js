const detox = require('detox')

const LoginFlow = require('./flows/login.flow')
const NavigateToLogsFlow = require('./flows/navigateToLogs.flow')
const NavigateToSettingsFlow = require('./flows/navigateToSettings.flow')

describe('Navigate to Logs Screen', () => {
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

  it('should navigate to the Logs screen', async () => {
    const flow = new NavigateToLogsFlow()
    await flow.navigateToLogs()
  })
})
