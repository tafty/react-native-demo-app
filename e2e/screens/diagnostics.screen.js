const CONFIGURATION_API_LABEL_TEXT = 'Configuration API Location'

module.exports = () => ({
  toBeVisible: async () => {
    await waitFor(element(by.text(CONFIGURATION_API_LABEL_TEXT)))
      .toBeVisible()
      .withTimeout(5000)
  },
})
