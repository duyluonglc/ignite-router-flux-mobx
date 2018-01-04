import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Styles/NavigationStyles'
import { Colors, Images } from '../Themes'
import {
  Actions,
  Scene,
  Router,
  Reducer,
  ActionConst,
  Tabs,
  Stack,
  Overlay,
  Lightbox,
  Drawer
} from 'react-native-router-flux'
import CustomNavBar from './CustomNavBar'
import TabIcon from '../Components/Tab/TabIcon'
import BaseLightbox from '../Components/lightbox/BaseLightbox'
import MessageBar from '../Components/MessageBar'

import DrawerContent from '../Containers/DrawerContent'
import LaunchScreen from '../Containers/LaunchScreen'
import HomeScreen from '../Containers/HomeScreen'
import ExploreScreen from '../Containers/ExploreScreen'
import NotificationScreen from '../Containers/NotificationScreen'
import ManageScreen from '../Containers/ManageScreen'

// Manifest of possible screens
class AppNavigation extends Component {
  render () {
    const reducerCreate = params => {
      const defaultReducer = new Reducer(params)
      return (state, action) => {
        console.log('ACTION:', action)
        return defaultReducer(state, action)
      }
    }
    const onBackPress = () => {
      if (Actions.state.index !== 0) {
        return false
      }
      Actions.pop()
      return true
    }
    return (
      <Router createReducer={reducerCreate} backAndroidHandler={onBackPress} navBar={CustomNavBar}>
        <Overlay>
          <Lightbox>
            <Stack key='root' hideNavBar>
              <Scene panHandlers={null} key='launchScreen' component={LaunchScreen} initial type={ActionConst.RESET} />
              <Drawer
                hideNavBar
                key='drawer'
                contentComponent={DrawerContent}
                drawerWidth={300}
              >
                <Tabs
                  key='tabBar'
                  tabs
                  icon={TabIcon}
                  type='reset'
                  tabBarPosition='bottom'
                  inactiveBackgroundColor={Colors.snow}
                  activeBackgroundColor={Colors.snow}
                  swipeEnabled={false}
                  animationEnabled={false}
                  gestureEnabled={false}
                  showLabel={false}
                  lazy
                  tabBarStyle={styles.tabBarStyle}
                >
                  <Stack initial key='tabHome' label='Home' imageSource={Images.iconHome}>
                    <Scene panHandlers={null} key='homeScreen' component={HomeScreen} menuButton searchButton />
                  </Stack>
                  <Stack key='tabExplore' label='Explore' imageSource={Images.iconExplore}>
                    <Scene panHandlers={null} key='exploreScreen' component={ExploreScreen} menuButton />
                  </Stack>
                  <Stack key='tabNotification' label='Notification' imageSource={Images.iconNotification}>
                    <Scene panHandlers={null} key='notificationScreen' component={NotificationScreen}menuButton />
                  </Stack>
                  <Stack key='tabMore' label='More' imageSource={Images.iconMenu}>
                    <Scene panHandlers={null} key='manageScreen' component={ManageScreen} menuButton />
                  </Stack>
                </Tabs>
              </Drawer>
            </Stack>
            <Scene key='lightBox' component={BaseLightbox} />
          </Lightbox>
          <Scene component={MessageBar} />
        </Overlay>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation)
