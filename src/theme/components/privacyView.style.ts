import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import Colors from '../colors'
import Values from '../values'

interface IPrivacyViewStyles {
  container: ViewStyle
  text: TextStyle
}

export class PrivacyViewStyles {
  static normal: IPrivacyViewStyles = StyleSheet.create<IPrivacyViewStyles>({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: Colors.background,
    },
    text: {
      alignSelf: 'center',
      marginTop: 48,
      color: Colors.textLight,
      fontSize: Values.text.size.small,
    },
  })
}
