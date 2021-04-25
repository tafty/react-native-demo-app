import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import Colors from '../colors'
import Values from '../values'

interface ILoginScreenStyles {
  container: ViewStyle
  content: ViewStyle
  copyright: ViewStyle
  error: TextStyle
  forgotPassword: TextStyle
  keyboardAvoidingView: ViewStyle
  instructions: TextStyle
  loginButton: ViewStyle
  logo: ImageStyle
  network: TextStyle
  passwordInput: ViewStyle
  title: TextStyle
}

export class LoginScreenStyles {
  static normal: ILoginScreenStyles = StyleSheet.create<ILoginScreenStyles>({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: Colors.background,
    },
    content: {
      flex: 1,
      paddingBottom: Values.screen.margin.bottom,
      paddingHorizontal: Values.screen.margin.horizontal,
      paddingTop: 48,
    },
    copyright: {
      alignSelf: 'center',
      marginTop: 48,
      color: Colors.textLight,
      fontSize: Values.text.size.small,
    },
    error: {
      alignSelf: 'center',
      color: Colors.textError,
      marginBottom: 16,
      fontSize: Values.text.size.medium,
      fontWeight: 'bold',
    },
    forgotPassword: {
      alignSelf: 'center',
      color: Colors.textLink,
      fontSize: Values.text.size.medium,
      fontWeight: '500',
    },
    instructions: {
      alignSelf: 'center',
      color: Colors.textLight,
      fontSize: Values.text.size.medium,
      marginBottom: 24,
      textAlign: 'center',
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    loginButton: {
      marginTop: 16,
      marginBottom: 24,
    },
    logo: {
      alignSelf: 'center',
      marginBottom: 16,
    },
    network: {
      alignSelf: 'center',
      color: Colors.textError,
      marginTop: 16,
      fontSize: Values.text.size.medium,
      fontWeight: 'bold',
    },
    passwordInput: {
      marginTop: 16,
    },
    title: {
      alignSelf: 'center',
      color: Colors.textLight,
      fontSize: Values.text.size.large,
      fontWeight: '500',
      marginBottom: 24,
    },
  })
}
