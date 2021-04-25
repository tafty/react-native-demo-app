import { getStorybookUI, configure } from '@storybook/react-native'

// import stories
configure(() => {
  require('./stories/components/settings/diagnosticsRow')
  require('./stories/components/settings/settingsList')
  require('./stories/components/settings/settingsRow')
}, module)

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUI = getStorybookUI({
  asyncStorage: require('@react-native-community/async-storage').default,
})

export default StorybookUI
