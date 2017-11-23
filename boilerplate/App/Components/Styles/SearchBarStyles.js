import {StyleSheet} from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  searchInput: {
    ...Fonts.style.normal,
    flex: 5,
    height: Metrics.searchBarHeight,
    alignSelf: 'center',
    padding: Metrics.smallMargin,
    textAlign: 'left',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.instructions,
    paddingLeft: 20,
    color: Colors.snow,
    flexDirection: 'row'
  },
  searchIcon: {
    left: Metrics.baseMargin,
    alignSelf: 'center',
    color: Colors.snow,
    backgroundColor: Colors.transparent
  },
  clearTextIcon: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignSelf: 'center',
    color: Colors.snow,
    backgroundColor: Colors.transparent
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.baseMargin
  },
  buttonLabel: {
    ...Fonts.style.bold,
    color: Colors.snow
  }
})
