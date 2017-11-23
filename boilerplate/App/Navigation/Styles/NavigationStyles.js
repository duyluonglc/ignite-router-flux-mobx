import { StyleSheet, Platform } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundColor
  },
  navigationBarStyle: {
    backgroundColor: Colors.primaryColor
  },
  titleStyle: {
    ...Fonts.style.bold,
    backgroundColor: Colors.transparent,
    color: Colors.snow,
    alignSelf: 'center'
  },
  icon: {
    backgroundColor: Colors.transparent
  },
  leftButtonStyle: {
    minWidth: 50,
    backgroundColor: Colors.transparent
  },
  rightButtonStyle: {
    minWidth: 50,
    backgroundColor: Colors.transparent
  },
  iconMenu: {
    width: Platform.OS === 'ios' ? 25 : 45,
    height: Platform.OS === 'ios' ? 20 : 40,
    backgroundColor: Colors.transparent
  },
  iconBack: {
    width: Platform.OS === 'ios' ? 25 : 45,
    height: Platform.OS === 'ios' ? 20 : 40,
    backgroundColor: Colors.transparent
  },
  tabBarCustomerStyle: {
    backgroundColor: Colors.snow
  },
  tabBarVenueStyle: {
    backgroundColor: Colors.snow
  },
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderTopColor: 'transparent'
  }
})
