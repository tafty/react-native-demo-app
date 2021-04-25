import { StyleSheet, ViewStyle } from 'react-native'

import Colors from '../../colors'
import Values from '../../values'

interface ISettingsScreenStyles {
  container: ViewStyle
  header: ViewStyle
}

export class SettingsScreenStyles {
  static normal: ISettingsScreenStyles = StyleSheet.create<
    ISettingsScreenStyles
  >({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    header: {
      marginHorizontal: Values.screen.margin.horizontal,
    },
  })
}
