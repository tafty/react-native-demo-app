import { getIsRealmEncrypted } from '../getIsRealmEncrypted'
import state from '../../__tests__/data/testApplicationState'

describe('isRealmEncryptedSelector', () => {
  it('should return whether or not to encrypt the database', () => {
    expect(getIsRealmEncrypted(state)).toBeTruthy()
  })
})
