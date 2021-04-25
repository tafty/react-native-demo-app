'use-strict'

export default class Colors {
  static black = 'rgba(0, 0, 0, 1)'
  static blue = 'rgba(0, 124, 255, 1)'
  static blueDark = 'rgba(0, 62, 255, 1)'
  static grey44 = 'rgba(44, 44, 44, 1)'
  static grey128 = 'rgba(128, 128, 128, 1)'
  static grey198 = 'rgba(198, 198, 198, 1)'
  static grey208 = 'rgba(208, 208, 208, 1)'
  static grey246 = 'rgba(246, 246, 246, 1)'
  static red = '#dc3545'
  static transparent = 'rgba(0, 0, 0, 0)'
  static transparent75 = 'rgba(0, 0, 0, 0.75)'
  static white = 'rgba(255, 255, 255, 1)'
  static white75 = 'rgba(255, 255, 255, 0.75)'

  static androidRippleColor = Colors.blueDark

  static background = Colors.white
  static backgroundOverlay = Colors.transparent75

  static buttonBackground = Colors.blue
  static buttonBackgroundDisabled = Colors.grey208
  static buttonBorder = Colors.blue
  static buttonBorderDisabled = Colors.grey128
  static buttonText = Colors.white
  static buttonTextDisabled = Colors.grey128

  static diagnosticsRowBackground = Colors.grey208

  static divider = Colors.grey246

  static iconDisabled = Colors.grey128
  static iconEnabled = Colors.blue

  static rowBackground = Colors.grey198

  static text = Colors.grey44
  static textDark = Colors.black
  static textDisabled = Colors.grey208
  static textError = Colors.red
  static textLink = Colors.blue
  static textLight = Colors.grey128

  static textInputBackground = Colors.white
  static textInputBorder = Colors.grey208
  static textInputBorderInvalid = Colors.red

  static topBarBackgroundColor = Colors.grey246
  static topBarButtons = Colors.black
}
