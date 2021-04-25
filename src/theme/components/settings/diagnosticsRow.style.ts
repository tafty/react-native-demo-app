import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import Colors from '../../colors'
import Values from '../../values'

interface IDiagnosticsRowStyles {
  row: ViewStyle
  title: TextStyle
  value: TextStyle
}

export class DiagnosticsRowStyles {
  static normal: IDiagnosticsRowStyles = StyleSheet.create<
    IDiagnosticsRowStyles
  >({
    row: {
      flex: 0,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: Values.list.row.padding,
      borderBottomWidth: 1,
      borderBottomColor: Colors.divider,
    },
    title: {
      fontSize: Values.text.size.medium,
    },
    value: {
      textAlign: 'right',
      fontSize: Values.text.size.medium,
      fontWeight: 'bold',
    },
  })
}
