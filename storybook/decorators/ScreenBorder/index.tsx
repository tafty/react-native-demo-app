import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import style from './style'

interface Props {
  children: any
}

export default function ScreenBorder(props: Props) {
  return <View style={style.main}>{props.children}</View>
}

ScreenBorder.defaultProps = {
  children: null,
}

ScreenBorder.propTypes = {
  children: PropTypes.node,
}
