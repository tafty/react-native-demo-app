import React, { Component } from 'react'
import { LogView } from 'react-native-device-log'
import PropTypes from 'prop-types'

import { NavigationOptions } from '../navigationOptions'

interface Props {
  componentId: string
}

export default class LogViewerScreen extends Component<Props> {
  static options() {
    return NavigationOptions.createNavigationOptions().addTitle('Logs').options
  }

  public static propTypes = {
    componentId: PropTypes.string,
  }

  render() {
    /*
    inverted: will write the log inverted.
    multiExpanded: means that multiple logmessages
    that are longer then one row can be expanded simultaneously
    timeStampFormat: moment format for timeStamp
    */
    return <LogView inverted={false} />
  }
}
