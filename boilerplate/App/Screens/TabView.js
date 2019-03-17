import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

const propTypes = {
  name: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
    // borderWidth: 2,
    // borderColor: 'red'
  }
})

@inject('auth')
@observer
class TabView extends React.Component {
  state = { hideNavBar: false }

  toggleNavBar = () => {
    this.setState({ hideNavBar: !this.state.hideNavBar }, () =>
      Actions.refresh({ hideNavBar: this.state.hideNavBar })
    )
  }

  render () {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <Text>Tab title:{this.props.title} name:{this.props.name}</Text>
        <Text style={{ fontSize: 30 }}>User:{this.props.auth.user.email}</Text>
        <Button onPress={() => this.props.auth.logout()}>Logout</Button>
        <Button onPress={() => { Actions.tab1() }}>Switch to tab1</Button>
        <Button onPress={() => { Actions.tab2() }}>Switch to tab2</Button>
        <Button onPress={() => { this.toggleNavBar() }}>Toggle NavBar</Button>
      </View>
    )
  }
}
TabView.propTypes = propTypes

export default TabView
