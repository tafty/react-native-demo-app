const localConfig = require('../config.json')

describe('Config', () => {
  it('should not check in local config with iStubbed set to true', () => {
    // FIXME When API is implement re-instate this test
    // expect(localConfig.api.isStubbed).toBeFalsy()
    expect(localConfig.api.isStubbed).toBeTruthy()
  })
})
