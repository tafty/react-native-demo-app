const PAUSE_LOG_BUTTON_TEXT = 'Pause log'
const CLEAR_LOG_BUTTON_TEXT = 'Clear log'

module.exports = () => ({
  toBeVisible: async () => {
    await waitFor(element(by.text(PAUSE_LOG_BUTTON_TEXT)))
      .toBeVisible()
      .withTimeout(5000)
    await waitFor(element(by.text(CLEAR_LOG_BUTTON_TEXT)))
      .toBeVisible()
      .withTimeout(5000)
  },
})
