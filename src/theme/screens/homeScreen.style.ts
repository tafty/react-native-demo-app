import { StyleSheet, ViewStyle } from 'react-native'

import Values from '../values'

interface IHomeScreenStyles {
  button: ViewStyle
  container: ViewStyle
}

export class HomeScreenStyles {
  static normal: IHomeScreenStyles = StyleSheet.create<IHomeScreenStyles>({
    button: {
      marginTop: 16,
    },
    container: {
      marginBottom: Values.screen.margin.bottom,
      marginHorizontal: Values.screen.margin.horizontal,
      marginTop: Values.screen.margin.top,
    },
  })
}
