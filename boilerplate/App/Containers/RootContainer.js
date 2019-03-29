import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import AppNavigation from '../Navigation/AppNavigation'
// Styles
import styles from './RootContainerStyles'
import { Metrics } from '../Themes'
import { appInit } from '../Config/MobxPersist'

class RootContainer extends Component {
  componentDidMount () {
    appInit() // run rehyrate after all screen loaded
  }

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
