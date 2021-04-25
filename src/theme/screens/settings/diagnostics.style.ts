import { StyleSheet, ViewStyle } from 'react-native'

import Colors from '../../colors'

interface IDiagnosticsScreenStyles {
  container: ViewStyle
  environment: ViewStyle
}

export class DiagnosticsScreenStyles {
  static normal: IDiagnosticsScreenStyles = StyleSheet.create<
    IDiagnosticsScreenStyles
  >({
    container: {
      flex: 1,
      backgroundColor: Colors.grey246,
    },
    environment: {
      textAlign: 'center',
      margin: 10,
    },
  })
}
