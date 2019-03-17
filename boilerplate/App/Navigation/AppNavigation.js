import React, { Component } from 'react'
import { Platform, StyleSheet } from 'react-native'
// import { StackViewStyleInterpolator } from 'react-navigation-stack'
import {
  Scene,
  Router,
  // Actions,
  // Reducer,
  // ActionConst,
  Overlay,
  Tabs,
  Modal,
  Stack
} from 'react-native-router-flux'

import TabView from '../Screens/TabView'
import LaunchScreen from '../Screens/LaunchScreen/LaunchScreen'
import LoginScreen from '../Screens/LoginScreen/LoginScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBarStyle: {
    backgroundColor: '#eee'
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd'
  }
})

const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF'
  // shadowOpacity: 0.9,
  // shadowRadius: 3
})

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://'

class AppNavigation extends Component {
  render () {
    return (
      <Router
        getSceneStyle={getSceneStyle}
        uriPrefix={prefix}
      >

        <Overlay key='overlay'>
          <Modal key='modal'
            hideNavBar
            headerLayoutPreset='center'
          >
            <Stack
              hideNavBar
              key='root'
              titleStyle={{ alignSelf: 'center' }}
            >
              <Tabs
                key='tabBar'
                swipeEnabled
                showLabel
                tabBarStyle={styles.tabBarStyle}
                activeBackgroundColor='rgba(255, 0, 0, 0.5)'
                inactiveBackgroundColor='#fff'
                tabBarPosition='bottom'
              >
                <Scene
                  key='tab1'
                  component={TabView}
                  title='Tab #1'

                />

                <Scene
                  key='tab2'
                  component={TabView}
                  title='Tab #2'
                  back
                />

              </Tabs>
            </Stack>

            <Scene key='launch' component={LaunchScreen} title='Launch' initial />
            <Scene key='login' component={LoginScreen} title='Login' type='reset' />
          </Modal>

        </Overlay>
      </Router>
    )
  }
}

export default AppNavigation
