module.exports = class Platform {
  static isAndroid() {
    return process.env.PLATFORM === 'android'
  }

  static isIOS() {
    return process.env.PLATFORM === 'ios'
  }
}
