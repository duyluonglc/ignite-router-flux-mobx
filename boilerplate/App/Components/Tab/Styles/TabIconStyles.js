import {StyleSheet} from 'react-native'
import { Fonts, Colors, Metrics } from '../../../Themes/'

export default StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    opacity: 0.5
  },
  tabIconActive: {
    // marginTop: Metrics.isIphoneX ? 10 : 5,
    height: Metrics.tabBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.snow,
    marginTop: Metrics.isIphoneX ? 27 : 0,
    paddingBottom: Metrics.tabBarPaddingBottom
  },
  imageIcon: {
    width: 20,
    height: 20
  },
  label: {
    ...Fonts.style.bold,
    marginTop: 3,
    fontSize: 12,
    backgroundColor: Colors.transparent
  }
})
