import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, ViewPropTypes, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from './Styles/DrawerContentStyle'

class DrawerContent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string
  }

  static contextTypes = {
    drawer: PropTypes.object
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Drawer Content</Text>
        <Button onPress={() => Actions.drawerClose()} title='Back' />
      </View>
    )
  }
}

export default DrawerContent
