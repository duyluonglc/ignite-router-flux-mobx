import { StyleSheet } from 'react-native'
import { Fonts } from '../../Themes'
import metrics from '../../Themes/Metrics'
import colors from '../../Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
    // justifyContent: 'center'
  },
  welcome: {
    ...Fonts.style.normal,
    marginTop: 40,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center'
  },
  title: {
    ...Fonts.style.normal,
    marginTop: metrics.baseMargin,
    marginBottom: 40,
    ...Fonts.style.h2,
    fontSize: 25,
    color: colors.green,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center'
  },
  loading: {
    marginVertical: 17,
    position: 'absolute',
    top: metrics.screenHeight / 2 - 20
  }
})
