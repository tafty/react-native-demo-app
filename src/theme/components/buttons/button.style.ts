import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import Colors from '../../colors'
import Values from '../../values'

interface IButtonStyles {
  container: ViewStyle
  icon: ViewStyle
  label: TextStyle
}

export class ButtonStyles {
  static _base: IButtonStyles = {
    container: {
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 1,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 16,
    },
    icon: {
      flex: 0,
      marginRight: 8,
    },
    label: {
      flex: 0,
      fontSize: Values.text.size.medium,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  }

  static disabled: IButtonStyles = StyleSheet.create<IButtonStyles>({
    ...ButtonStyles._base,
    container: {
      ...ButtonStyles._base.container,
      backgroundColor: Colors.buttonBackgroundDisabled,
      borderColor: Colors.buttonBorderDisabled,
    },
    icon: {
      ...ButtonStyles._base.icon,
      color: Colors.iconDisabled,
    },
    label: {
      ...ButtonStyles._base.label,
      color: Colors.buttonTextDisabled,
    },
  })

  static normal: IButtonStyles = StyleSheet.create<IButtonStyles>({
    ...ButtonStyles._base,
    container: {
      ...ButtonStyles._base.container,
      backgroundColor: Colors.buttonBackground,
      borderColor: Colors.buttonBorder,
    },
    icon: {
      ...ButtonStyles._base.icon,
      color: Colors.iconEnabled,
    },
    label: {
      ...ButtonStyles._base.label,
      color: Colors.buttonText,
    },
  })
}
