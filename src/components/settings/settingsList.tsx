import React, { Component } from 'react'

import { FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { SettingsListStyles } from '../../theme/components/settings/settingsList.style'
import SettingsRow from './settingsRow'

export type SettingsListOption = {
  onPress: Function
  title: string
}

interface IProps {
  options: Array<SettingsListOption> | undefined | null
}

interface IState {
  options: Array<SettingsListOption> | undefined | null
}

export default class SettingsList extends Component<IProps, IState> {
  static propTypes = {
    options: PropTypes.array,
  }

  constructor(props: IProps) {
    super(props)

    this.state = {
      options: this.props.options,
    }
  }

  render() {
    const styles = SettingsListStyles.normal

    return (
      <FlatList
        data={this.state.options}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderItem}
        style={styles.container}
      />
    )
  }

  renderItem = ({ item }: { item: SettingsListOption }) => {
    return <SettingsRow onPress={() => item.onPress()} title={item.title} />
  }
}
