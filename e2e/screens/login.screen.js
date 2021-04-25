const USERNAME_INPUT = 'username-input'
const PASSWORD_INPUT = 'password-input'
const LOGIN_BUTTON = 'login-button'

module.exports = () => ({
  toBeVisible: async () => {
    await waitFor(element(by.id(USERNAME_INPUT)))
      .toBeVisible()
      .withTimeout(5000)
  },
  enterUsername: async username => {
    await waitFor(element(by.id(USERNAME_INPUT)))
      .toBeVisible()
      .withTimeout(5000)
    await element(by.id(USERNAME_INPUT)).typeText(username)
  },
  enterPassword: async password => {
    await waitFor(element(by.id(PASSWORD_INPUT)))
      .toBeVisible()
      .withTimeout(5000)
    await element(by.id(PASSWORD_INPUT)).typeText(password)
  },
  pressLogin: async () => {
    await expect(element(by.id(LOGIN_BUTTON))).toBeVisible()
    await element(by.id(LOGIN_BUTTON)).multiTap(+process.env.TAP_COUNT)
  },
})
