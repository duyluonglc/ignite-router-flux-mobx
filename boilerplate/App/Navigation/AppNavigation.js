import React, { Component } from 'react'
import { Platform, StyleSheet, Text } from 'react-native'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox
} from 'react-native-router-flux'
import ErrorModal from '../Components/modal/ErrorModal'
import DemoLightbox from '../Components/lightbox/DemoLightbox'
import DrawerContent from '../Components/drawer/DrawerContent'
import TabIcon from '../Components/tab/TabIcon'

import LaunchScreen from '../Containers/LaunchScreen'
import Launch from '../Containers/Launch'
import Register from '../Containers/Register'
import Login from '../Containers/Login'
import Login2 from '../Containers/Login2'
import Login3 from '../Containers/Login3'
import Home from '../Containers/Home'
import TabView from '../Containers/TabView'
import EchoView from '../Containers/EchoView'
import MessageBar from '../Containers/MessageBar'
import CustomNavBarView from '../Containers/CustomNavBarView'
import CustomNavBar from '../Containers/CustomNavBar'
import CustomNavBar2 from '../Containers/CustomNavBar2'

import MenuIcon from '../Images/Icons/menu_burger.png'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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

const reducerCreate = params => {
  const defaultReducer = new Reducer(params)
  return (state, action) => {
    console.log('ACTION:', action)
    return defaultReducer(state, action)
  }
}

const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF',
  shadowOpacity: 1,
  shadowRadius: 3
})

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://'

class AppNavigation extends Component {
  render () {
    return (
      <Router
        createReducer={reducerCreate}
        getSceneStyle={getSceneStyle}
        uriPrefix={prefix}>

        <Overlay key='overlay'>
          <Modal key='modal'
            hideNavBar
            transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })}
          >
            <Lightbox key='lightbox'>
              <Stack
                hideNavBar
                key='root'
                titleStyle={{ alignSelf: 'center' }}
              >
                <Scene key='echo' back clone component={EchoView} getTitle={({ navigation }) => navigation.state.key} />
                <Scene key='launchScreen' component={LaunchScreen} title='Launch' initial />
                <Scene key='launch' component={Launch} title='Launch' />

                <Stack key='customNavBar' hideTabBar titleStyle={{ alignSelf: 'center' }}>
                  <Scene
                    key='customNavBar1'
                    title='CustomNavBar 1'
                    navBar={CustomNavBar}
                    component={CustomNavBarView}
                    back
                  />
                  <Scene
                    key='customNavBar2'
                    title='CustomNavBar 2'
                    navBar={CustomNavBar}
                    component={CustomNavBarView}
                    back
                  />
                  <Scene
                    key='customNavBar3'
                    title='Another CustomNavBar'
                    navBar={CustomNavBar2}
                    component={CustomNavBarView}
                    back
                  />
                  <Scene
                    key='hiddenNavBar'
                    title='hiddenNavBar'
                    component={CustomNavBarView}
                    hideNavBar
                    back
                  />
                </Stack>

                <Stack
                  back
                  backTitle='Back'
                  key='register'
                  duration={0}
                  navTransparent
                >
                  <Scene key='_register' component={Register} title='Register' />
                  <Scene key='register2' component={Register} title='Register2' />
                  <Scene key='home' component={Home} title='Replace' type={ActionConst.REPLACE} />
                </Stack>

                <Drawer
                  hideNavBar
                  key='drawer'
                  contentComponent={DrawerContent}
                  drawerImage={MenuIcon}
                  drawerWidth={300}
                >
                  {/*
                Wrapper Scene needed to fix a bug where the tabs would
                reload as a modal ontop of itself
              */}
                  <Scene hideNavBar panHandlers={null}>
                    <Tabs
                      key='tabbar'
                      swipeEnabled
                      showLabel={false}
                      tabBarStyle={styles.tabBarStyle}
                      activeBackgroundColor='white'
                      inactiveBackgroundColor='rgba(255, 0, 0, 0.5)'
                      tabBarPosition='bottom'
                    >
                      <Stack
                        key='tab_1'
                        title='Tab #1'
                        tabBarLabel='TAB #1'
                        inactiveBackgroundColor='#FFF'
                        activeBackgroundColor='#DDD'
                        icon={TabIcon}
                        navigationBarStyle={{ backgroundColor: 'green' }}
                        titleStyle={{ color: 'white', alignSelf: 'center' }}
                      >
                        <Scene
                          key='tab_1_1'
                          component={TabView}
                          title='Tab #1_1'
                          onRight={() => alert('Right button')}
                          rightTitle='Right'

                        />

                        <Scene
                          key='tab1_2'
                          component={TabView}
                          title='Tab #1_2'
                          back
                          titleStyle={{ color: 'black', alignSelf: 'center' }}
                        />
                      </Stack>

                      <Stack
                        key='tab_2'
                        title='Tab #2'
                        icon={TabIcon}
                        initial
                      >
                        <Scene
                          key='tab_2_1'
                          component={TabView}
                          title='Tab #2_1'
                          renderRightButton={() => <Text>Right</Text>}
                        />
                        <Scene
                          key='tab_2_2'
                          component={TabView}
                          title='Tab #2_2'
                          onBack={() => alert('onBack button!')}
                          hideDrawerButton
                          backTitle='Back!'
                          panHandlers={null}
                        />
                      </Stack>

                      <Stack key='tab_3'>
                        <Scene
                          key='tab_3_1'
                          component={TabView}
                          title='Tab #3'
                          icon={TabIcon}
                          rightTitle='Right3'
                          onRight={() => { }}
                        />
                      </Stack>
                      <Scene key='tab_4_1' component={TabView} title='Tab #4' hideNavBar icon={TabIcon} />
                      <Stack key='tab_5'>
                        <Scene key='tab_5_1' component={TabView} title='Tab #5' icon={TabIcon} />
                      </Stack>
                    </Tabs>
                  </Scene>
                </Drawer>
              </Stack>

              <Scene key='demo_lightbox' component={DemoLightbox} />
            </Lightbox>
            <Scene key='error' component={ErrorModal} />
            <Stack key='login' path='login/:data' titleStyle={{ alignSelf: 'center' }}>
              <Scene
                key='loginModal'
                component={Login}
                title='Login'
                onExit={() => console.log('onExit')}
                leftTitle='Cancel'
                onLeft={Actions.pop}
              />
              <Scene
                key='loginModal2'
                component={Login2}
                title='Login2'
                backTitle='Back'
                panHandlers={null}
                duration={1}
              />
              <Scene
                key='loginModal3'
                hideNavBar
                component={Login3}
                title='Login3'
                panHandlers={null}
                duration={1}
              />
            </Stack>
          </Modal>

          <Scene component={MessageBar} />
        </Overlay>
      </Router>
    )
  }
}

export default AppNavigation
