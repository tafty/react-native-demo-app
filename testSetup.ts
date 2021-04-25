jest.mock('@react-native-community/async-storage', () => {
  return {
    getItem: () => {
      return new Promise(resolve => resolve(''))
    },
    setItem: () => {
      return new Promise(resolve => resolve(''))
    },
  }
})

jest.mock('@react-native-community/netinfo', () => {
  return {
    getCurrentState: jest.fn(() => Promise.resolve()),
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  }
})

jest.mock('crypto-es', () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    SHA512: (key: string) => {
      return {
        words: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      }
    },
  }
})

jest.mock('i18n-js', () => {
  return {
    currentLocale: () => {
      return 'en-GB'
    },
    t: (key: any) => {
      return key
    },
  }
})

jest.mock('react-native-device-info', () => {
  class RNDeviceInfo {
    constructor() {}

    getVersion = () => {
      return '1.0.2'
    }

    getBrand = () => {
      return 'Apple'
    }

    getModel = () => {
      return 'iPhone 6'
    }

    getBuildNumber = () => {
      return '10000002'
    }

    getUniqueId = () => {
      return 'this_is_a_unique_device_id'
    }

    getSystemName = () => {
      return 'iOS'
    }

    getSystemVersion = () => {
      return '12.0'
    }

    isEmulator = () => {
      return new Promise(resolve => resolve(false))
    }
  }

  return new RNDeviceInfo()
})

jest.mock('react-native-device-log', () => {
  class deviceLog {
    constructor() {}
    log = (...args: any[]) => {
      console.log('LOG', args)
    }
    trace = (...args: any[]) => {
      console.log('TRACE', args)
    }
    debug = (...args: any[]) => {
      console.log('DEBUG', args)
    }
    info = (...args: any[]) => {
      console.log('INFO', args)
    }
    error = (...args: any[]) => {
      console.log('ERROR:', args)
    }
    startTimer = () => {}
    stopTimer = () => {}
    logTime = () => {}
  }

  return new deviceLog()
})

jest.mock('react-native-localize', () => {
  const getLocales = () => [
    // you can choose / add the locales you want
    {
      countryCode: 'US',
      languageTag: 'en-US',
      languageCode: 'en',
      isRTL: false,
    },
    {
      countryCode: 'FR',
      languageTag: 'fr-FR',
      languageCode: 'fr',
      isRTL: false,
    },
  ]

  // use a provided translation, or return undefined to test your fallback
  const findBestAvailableLanguage = () => ({
    languageTag: 'en-US',
    isRTL: false,
  })

  const getNumberFormatSettings = () => ({
    decimalSeparator: '.',
    groupingSeparator: ',',
  })

  const getCalendar = () => 'gregorian' // or "japanese", "buddhist"
  const getCountry = () => 'US' // the country code you want
  const getCurrencies = () => ['USD', 'EUR'] // can be empty array
  const getTemperatureUnit = () => 'celsius' // or "fahrenheit"
  const getTimeZone = () => 'Europe/Paris' // the timezone you want
  const uses24HourClock = () => true
  const usesMetricSystem = () => true

  const addEventListener = jest.fn()
  const removeEventListener = jest.fn()

  return {
    findBestAvailableLanguage,
    getLocales,
    getNumberFormatSettings,
    getCalendar,
    getCountry,
    getCurrencies,
    getTemperatureUnit,
    getTimeZone,
    uses24HourClock,
    usesMetricSystem,
    addEventListener,
    removeEventListener,
  }
})

jest.mock('react-native-navigation', () => {
  return {
    Navigation: {
      registerComponent: jest.fn(),
      pop: () => {
        return {
          catch: jest.fn(),
          then: jest.fn(),
        }
      },
      popTo: () => {
        return {
          catch: jest.fn(),
          then: jest.fn(),
        }
      },
      popToRoot: () => {
        return {
          catch: jest.fn(),
          then: jest.fn(),
        }
      },
      push: jest.fn(),
      mergeOptions: jest.fn(),
      dismissModal: jest.fn(),
      showOverlay: jest.fn(),
      dismissOverlay: jest.fn(),
      events: () => {
        return {
          bindComponent: () => {
            return jest.fn()
          },
          registerBottomTabSelectedListener: () => {
            return jest.fn()
          },
          registerCommandListener: () => {
            return jest.fn()
          },
          registerCommandCompletedListener: () => {
            return jest.fn()
          },
        }
      },
    },
  }
})

jest.mock('./storybook', () => {
  return ''
})
