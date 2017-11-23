import { Colors, Metrics, Fonts } from '../../Themes/'

export default {
  header: {
    backgroundColor: Colors.primaryColor,
    paddingTop: Metrics.navBarPaddingTop,
    height: Metrics.navBarHeight,
    width: Metrics.screenWidth,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerAndroidStatusBarTranslucent: {
    backgroundColor: Colors.transparent,
    paddingTop: Metrics.platform === 'android' ? (Metrics.navBarPaddingTop + Metrics.statusBarHeight) : Metrics.navBarPaddingTop,
    height: Metrics.navBarHeight + Metrics.statusBarHeight,
    width: Metrics.screenWidth,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerShadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  headerTransparent: {
    backgroundColor: Colors.transparent,
    height: Metrics.navBarHeight,
    width: Metrics.screenWidth,
    paddingTop: Metrics.navBarPaddingTop,
    flexDirection: 'row',
    alignItems: 'center',
    top: 0,
    right: 0,
    left: 0,
    position: 'absolute'
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 75,
    height: Metrics.navBarHeight
  },
  leftButton: {
    paddingVertical: 10,
    paddingLeft: 8,
    paddingRight: 15
  },
  iconBack: {
    backgroundColor: Colors.transparent,
    width: 25,
    height: 25
  },
  iconNotification: {
    backgroundColor: Colors.transparent,
    width: 40,
    height: 40,
    tintColor: Colors.snow
  },
  iconMenu: {
    backgroundColor: Colors.transparent,
    width: 25,
    height: 25
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5
  },
  title: {
    ...Fonts.style.bold,
    color: Colors.snow,
    fontSize: 18
  },
  rightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 75,
    height: Metrics.navBarHeight
  },
  rightButton: {
    paddingVertical: 10,
    paddingLeft: 7,
    paddingRight: 8
  },
  cartButton: {
    paddingRight: 7,
    paddingLeft: 8,
    height: Metrics.navBarHeight,
    justifyContent: 'center'
  },
  iconCart: {
    backgroundColor: Colors.transparent,
    width: 22,
    height: 22
  },
  badge: {
    position: 'absolute',
    right: 5,
    top: 10,
    backgroundColor: Colors.fire,
    width: 17,
    height: 17,
    borderRadius: 8.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtBadge: {
    ...Fonts.style.bold,
    fontSize: 10,
    color: Colors.snow
  },
  badgeNotification: {
    position: 'absolute',
    left: 19,
    top: 16,
    backgroundColor: Colors.fire,
    minWidth: 13,
    height: 13,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.primaryColor
  },
  txtBadgeNotification: {
    ...Fonts.style.bold,
    fontSize: 8,
    color: Colors.snow,
    marginHorizontal: 2
  },
  searchButton: {
    marginLeft: 5,
    paddingRight: 7,
    paddingLeft: 8,
    height: Metrics.navBarHeight,
    justifyContent: 'center'
  },
  iconSearch: {
    backgroundColor: Colors.transparent,
    width: 20,
    height: 20
  },
  rightFlex: {
    flex: 1
  },
  rightButtonText: {
    ...Fonts.style.bold,
    color: Colors.snow,
    fontSize: 15
  },
  searchWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: Colors.primaryColor
  }
}
