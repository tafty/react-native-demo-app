import CryptoES from 'crypto-es'
import { createSelector } from 'reselect'
import DeviceInfo from 'react-native-device-info'
import { getEnvironment } from '../configuration/getEnvironment'

export const getRealmEncryptionKey = createSelector(
  [getEnvironment],
  (environment: string) => {
    const environmentHash = CryptoES.SHA512(environment)
    const deviceHash = CryptoES.SHA512(DeviceInfo.getUniqueId())
    const brandHash = CryptoES.SHA512(DeviceInfo.getBrand())
    const modelHash = CryptoES.SHA512(DeviceInfo.getModel())

    let keyArray = new Int8Array(64)
    keyArray.set(environmentHash.words)
    keyArray.set(deviceHash.words, 16)
    keyArray.set(brandHash.words, 32)
    keyArray.set(modelHash.words, 48)

    return keyArray
  },
)
