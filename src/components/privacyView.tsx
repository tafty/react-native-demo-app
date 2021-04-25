import { SafeAreaView, Text } from 'react-native'

import { PrivacyViewStyles } from '../theme/components/privacyView.style'
import React from 'react'
import { getIsLoggedIn } from '../selectors/security/getIsLoggedIn'
import { translate } from '../localisation/translate'
import { useSelector } from 'react-redux'

interface IProps {
  render: Function
}

const PrivacyView = (props: IProps) => {
  const isLoggedIn = useSelector(getIsLoggedIn)

  if (isLoggedIn) {
    return props.render()
  }

  const styles = PrivacyViewStyles.normal

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{translate('checking_credentials')}</Text>
    </SafeAreaView>
  )
}

export default PrivacyView
