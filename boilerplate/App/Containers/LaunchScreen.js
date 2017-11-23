import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Image, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LaunchScreenStyle'
import { Images } from '../Themes'
import { Actions } from 'react-native-router-flux'

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
      // if (props.user) {
      // } else {
      // }
      setTimeout(() => {
        Actions.homeScreen()
      }, 3000)
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
      <ImageBackground source={Images.splash} style={styles.mainContainer}>
        <Image style={styles.logo} source={Images.logo} />
        <View style={styles.content}>
          <ActivityIndicator color='#fff' size='small' />
          <Text style={styles.contentTextStyles}>Welcome to Ignite app</Text>
        </View>
      </ImageBackground>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isStarting: state.startup.isStarting
    // user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
