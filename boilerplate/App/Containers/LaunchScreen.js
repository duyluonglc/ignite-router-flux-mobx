import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LaunchScreenStyle'
import colors from '../Themes/Colors'
// import { Actions } from 'react-native-router-flux'

class LaunchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isStartUp: true
    }
  }

  startup (props) {
    if (!props.isStarting && this.state.isStartUp) {
      this.setState({ isStartUp: false })
      if (props.user) {
      } else {
      }
    }
  }

  componentDidMount () {
    this.startup(this.props)
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    this.startup(newProps)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>WELCOME</Text>
        <Text style={styles.title}>APP</Text>
        {<ActivityIndicator style={styles.loading} size='large' color={colors.green} />}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isStarting: state.startup.isStarting,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
