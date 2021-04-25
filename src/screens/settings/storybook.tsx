import { connect } from 'react-redux'
import { NavigationOptions } from '../navigationOptions'

import StorybookUI from '../../../storybook'

import React, { Component } from 'react'

type StorybookScreenProps = {}

class StorybookScreen extends Component<StorybookScreenProps> {
  static options() {
    return NavigationOptions.createNavigationOptions().addTitle('Storybook')
      .options
  }

  render() {
    return <StorybookUI />
  }
}

function mapStateToProps() {
  return {}
}

const actions = {}

export default connect(mapStateToProps, actions)(StorybookScreen)
