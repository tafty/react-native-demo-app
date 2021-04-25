import React, { Component } from 'react'

import type { ApplicationState } from '../../reducers'
import DeviceInfo from 'react-native-device-info'
import DiagnosticsRow from '../../components/settings/diagnosticsRow'
import { DiagnosticsScreenStyles } from '../../theme/screens/settings/diagnostics.style'
import { NavigationOptions } from '../navigationOptions'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getApiUri } from '../../selectors/configuration/getApiUri'
import { getEnvironment } from '../../selectors/configuration/getEnvironment'
import { getIsApiStubbed } from '../../selectors/configuration/getIsApiStubbed'
import { getIsRemoteConfigEnabled } from '../../selectors/configuration/getIsRemoteConfigEnabled'
import { getRealmPath } from '../../selectors/realm/getRealmPath'
import { getRemoteConfigUri } from '../../selectors/configuration/getRemoteConfigUri'
import moment from 'moment'

const MetaData = require('../../metadata.json')

interface IPassedProps {
  componentId: string
}

interface IMappedProps {
  configApiUri: string
  apiUri: string
  environment: string
  isApiStubbed: boolean
  isRemoteConfigEnabled: boolean
  realmPath: string
}

interface IActionProps {}

interface IProps extends IPassedProps, IMappedProps, IActionProps {}

class DiagnosticsScreen extends Component<IProps> {
  static options() {
    return NavigationOptions.createNavigationOptions().addTitle('Diagnostics')
      .options
  }

  static propTypes = {
    apiUri: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    configApiUri: PropTypes.string.isRequired,
    environment: PropTypes.string.isRequired,
    isApiStubbed: PropTypes.bool.isRequired,
    isRemoteConfigEnabled: PropTypes.bool.isRequired,
    realmPath: PropTypes.string.isRequired,
  }

  render() {
    const styles = DiagnosticsScreenStyles.normal

    const {
      apiUri,
      configApiUri,
      environment,
      isApiStubbed,
      isRemoteConfigEnabled,
    } = this.props

    const apiEndPoint = isApiStubbed ? 'Using internal stub' : apiUri
    const configurationApiLocation = isRemoteConfigEnabled
      ? configApiUri
      : 'Using internal stub'
    const buildDate = moment(MetaData.build_date)

    return (
      <ScrollView style={styles.container}>
        <DiagnosticsRow
          title="Configuration API Location"
          value={configurationApiLocation}
        />
        <DiagnosticsRow title="Environment" value={`${environment}`} />
        <DiagnosticsRow title="API End Point" value={apiEndPoint} />
        <DiagnosticsRow title="Device Brand" value={DeviceInfo.getBrand()} />
        <DiagnosticsRow title="Device Model" value={DeviceInfo.getModel()} />
        <DiagnosticsRow title="Device OS" value={DeviceInfo.getSystemName()} />
        <DiagnosticsRow
          title="Device OS Version"
          value={DeviceInfo.getSystemVersion()}
        />
        <DiagnosticsRow title="App Version" value={DeviceInfo.getVersion()} />
        <DiagnosticsRow
          title="Build Number"
          value={DeviceInfo.getBuildNumber()}
        />
        <DiagnosticsRow title="Device ID" value={DeviceInfo.getUniqueId()} />
        <DiagnosticsRow title="Git Hash" value={MetaData.git_commit} />
        <DiagnosticsRow title="Build Date" value={buildDate.toString()} />
      </ScrollView>
    )
  }
}

function mapStateToProps(state: ApplicationState): IMappedProps {
  return {
    configApiUri: getRemoteConfigUri(state),
    apiUri: getApiUri(state),
    environment: getEnvironment(state),
    isApiStubbed: getIsApiStubbed(state),
    isRemoteConfigEnabled: getIsRemoteConfigEnabled(state),
    realmPath: getRealmPath(state),
  }
}

export default connect(mapStateToProps)(DiagnosticsScreen)
