import { StyleSheet, ViewStyle } from 'react-native'

interface ISettingsRowStyles {
  button: ViewStyle
}

export class SettingsRowStyles {
  static normal: ISettingsRowStyles = StyleSheet.create({
    button: {
      marginVertical: 8,
    },
  })
}
