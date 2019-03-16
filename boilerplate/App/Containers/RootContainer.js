import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import AppNavigation from '../Navigation/AppNavigation'
// Styles
import styles from './Styles/RootContainerStyles'
import { Metrics } from '../Themes'

class RootContainer extends Component {
  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar
          backgroundColor={Metrics.statusBarColor}
          barStyle={Metrics.statusBarStyle}
        />
        <AppNavigation />
      </View>
    )
  }
}

export default RootContainer
