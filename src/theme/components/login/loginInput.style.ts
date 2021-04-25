import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import Colors from '../../colors'
import Values from '../../values'

const iconTop = Platform.OS === 'ios' ? 16 : 20

interface ILoginInputStyles {
  container: ViewStyle
  iconRight: ViewStyle
  label: TextStyle
  textInput: TextStyle
}
export class LoginInputStyles {
  static normal: ILoginInputStyles = StyleSheet.create({
    container: {
      flex: 0,
      flexDirection: 'column',
    },
    iconRight: {
      color: Colors.buttonBackground,
      position: 'absolute',
      right: 16,
      top: iconTop,
    },
    label: {
      color: Colors.text,
      fontSize: Values.text.size.medium,
      fontWeight: 'bold',
      marginBottom: 2,
      textAlign: 'left',
    },
    textInput: {
      backgroundColor: Colors.textInputBackground,
      borderColor: Colors.textInputBorder,
      borderRadius: 4,
      borderWidth: 1,
      fontSize: Values.text.size.medium,
      paddingLeft: 16,
      paddingRight: 46,
      paddingVertical: 16,
    },
  })
}
