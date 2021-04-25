const detox = require('detox')

const LoginFlow = require('./flows/login.flow')
const LogOutFlow = require('./flows/logOut.flow')

describe('Log Out', () => {
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

  it('should log out', async () => {
    const flow = new LogOutFlow()
    await flow.logOut()
  })
})
