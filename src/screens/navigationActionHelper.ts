import * as componentIds from '../componentIds'
import * as screens from './screens'

import { Navigation } from 'react-native-navigation'

var navigationActions: Array<string> = []

/**
 *
 * Use this helper to show an activity indicator on an overlay when an action is dispatched
 * from a UI component that may result in a delay to navigation occurring
 *
 * For example, if dispatching an action results in a saga interacting with the database
 * and then updating state followed by the actual navigation occurring
 *
 * The action will need to include a navigationId and componentId in it's parameters
 *
 * From the UI component dispatching the action call:
 *
 *    NavigationActionHelper.start(navigationActions.EDIT, () =>
 *      this.props.editAction(navigationActions.EDIT, this.props.componentId, data)
 *    )
 *
 * In the saga, once all processing is complete and navigation is to occur call:
 *
 *    NavigationActionHelper.navigate(
 *      action.navigationId,
 *      action.componentId,
 *      screens.NEXT_SCREEN
 *    )
 *
 * Alternatively, if navigation needs to be cancelled call:
 *
 *    NavigationActionHelper.complete(navigationActions.EDIT)
 *
 * *** THIS MECHANISM SHOULD NOT BE USED FOR VERY LONG RUNNING PROCESSES SUCH AS NETWORK CALLS ***
 *
 */
export default class NavigationActionHelper {
  static reset = () => {
    navigationActions = []
  }

  static start = (
    navigationActionId: string,
    method: Function,
    error?: string,
  ) => {
    if (navigationActions.indexOf(navigationActionId) > -1) {
      return
    }

    navigationActions.push(navigationActionId)

    Navigation.showOverlay({
      component: {
        id: componentIds.NAVIGATION_ACTION_OVERLAY,
        name: screens.NAVIGATION_ACTION_OVERLAY,
        passProps: {
          error: error,
          navigationActionId,
        },
        options: {
          layout: {
            componentBackgroundColor: 'transparent',
          },
          overlay: {
            interceptTouchOutside: true,
          },
          animations: {
            showModal: {
              enabled: false,
            },
          },
        },
      },
    }).then(() => method())
  }

  static navigate = (
    navigationActionId: string,
    componentId: string,
    screenId: string,
    options?: any,
    passProps?: any,
    id?: string,
  ) => {
    var layout = {
      component: {
        name: screenId,
        options,
        passProps,
        id,
      },
    }

    Navigation.push(componentId, layout).then(() => {
      NavigationActionHelper.complete(navigationActionId)
    })
  }

  static complete = (navigationActionId: string) => {
    if (navigationActions.indexOf(navigationActionId) > -1) {
      try {
        Navigation.dismissOverlay(componentIds.NAVIGATION_ACTION_OVERLAY)
      } catch (e) {}

      navigationActions = navigationActions.filter(event => {
        return event !== navigationActionId
      })
    }
  }
}
