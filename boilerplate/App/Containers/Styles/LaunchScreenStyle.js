import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  backgroundImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: Metrics.screenHeight / 4
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Metrics.screenHeight * 0.15
  },
  contentTextStyles: {
    ...Fonts.style.normal,
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10
  }
})
