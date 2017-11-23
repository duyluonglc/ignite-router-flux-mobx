import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderTopWidth: 4,
    width: Metrics.screenWidth / 3 - 30,
    borderTopColor: Colors.transparent
  },
  imageIcon: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
    opacity: 0.5,
    marginTop: 8
  },
  imageIconSelected: {
    tintColor: Colors.tint,
    opacity: 1
  },
  title: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 12,
    color: Colors.text
  },
  titleSelected: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 12,
    color: Colors.tint
  }
})
