import { StyleSheet, ViewStyle } from 'react-native'
import Values from '../../values'

interface ISettingsListStyles {
  container: ViewStyle
  row: ViewStyle
}

export class SettingsListStyles {
  static normal: ISettingsListStyles = StyleSheet.create<ISettingsListStyles>({
    container: {
      flex: 1,
      paddingHorizontal: Values.screen.margin.horizontal,
    },
    row: {
      paddingVertical: 8,
    },
  })
}
