import { Dimensions, StyleSheet } from 'react-native'
import Colors from '../colors'

export class NavigationActionOverlayScreenStyles {
  static normal: any = StyleSheet.create({
    scrollContainer: {
      flex: 1,
      backgroundColor: Colors.transparent,
    },
    scrollContainerDark: {
      flex: 1,
      backgroundColor: Colors.backgroundOverlay,
    },
    container: {
      flex: 1,
      backgroundColor: Colors.transparent,
      justifyContent: 'center',
      alignItems: 'center',
      height: Dimensions.get('window').height,
    },
    activityIndicator: {
      color: Colors.white,
    },
  })
}
