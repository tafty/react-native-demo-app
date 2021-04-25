const DIAGNOSTICS_BUTTON = 'Diagnostics-button'
const LOGS_BUTTON = 'Logs-button'

module.exports = () => ({
  toBeVisible: async () => {
    await waitFor(element(by.id(DIAGNOSTICS_BUTTON)))
      .toBeVisible()
      .withTimeout(5000)
  },
  pressDiagnostics: async () => {
    await expect(element(by.id(DIAGNOSTICS_BUTTON))).toBeVisible()
    await element(by.id(DIAGNOSTICS_BUTTON)).multiTap(+process.env.TAP_COUNT)
  },
  pressLogs: async () => {
    await expect(element(by.id(LOGS_BUTTON))).toBeVisible()
    await element(by.id(LOGS_BUTTON)).multiTap(+process.env.TAP_COUNT)
  },
})
