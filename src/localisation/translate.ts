import * as RNLocalize from 'react-native-localize'

import { I18nManager } from 'react-native'
import i18n from 'i18n-js'

const memoize = require('lodash.memoize')

interface TranslationGetters {
  [key: string]: any
}

const translationGetters: TranslationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require('./translations/en.json'),
  fr: () => require('./translations/fr.json'),
}

export const translate = memoize(
  (key: string, config?: any) => i18n.t(key, config),
  (key: string, config?: any) => (config ? key + JSON.stringify(config) : key),
)

export const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: 'en', isRTL: false }

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback

  // clear translation cache
  translate.cache.clear!()
  // update layout direction
  I18nManager.forceRTL(isRTL)
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() }
  i18n.locale = languageTag
}

export function currentLocale() {
  return i18n.currentLocale()
}
