const SETTINGS_BUTTON = 'settings-button'
const LOG_OUT_BUTTON = 'log-out-button'

module.exports = () => ({
  toBeVisible: async () => {
    await waitFor(element(by.id(SETTINGS_BUTTON)))
      .toBeVisible()
      .withTimeout(5000)
  },
  pressLogOut: async () => {
    await expect(element(by.id(LOG_OUT_BUTTON))).toBeVisible()
    await element(by.id(LOG_OUT_BUTTON)).multiTap(+process.env.TAP_COUNT)
  },
  pressSettings: async () => {
    await expect(element(by.id(SETTINGS_BUTTON))).toBeVisible()
    await element(by.id(SETTINGS_BUTTON)).multiTap(+process.env.TAP_COUNT)
  },
})
