import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import AppNavigation from '../Navigation/AppNavigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
// Styles
import styles from './Styles/RootContainerStyles'
import { Metrics } from '../Themes'

class RootContainer extends Component {
  state = {}

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
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

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: bindActionCreators(StartupActions.startup, dispatch)
})

export default connect(null, mapDispatchToProps)(RootContainer)
