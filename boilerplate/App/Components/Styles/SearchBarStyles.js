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
    paddingLeft: 8,
    color: Colors.snow,
    flexDirection: 'row'
  },
  searchIcon: {
    marginLeft: 8,
    backgroundColor: Colors.transparent,
    width: 15,
    height: 15
  },
  clearTextIcon: {
    marginLeft: 6,
    marginRight: 6,
    marginTop: 5,
    marginBottom: 5,
    color: Colors.snow,
    backgroundColor: Colors.transparent,
    width: 15,
    height: 15
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
