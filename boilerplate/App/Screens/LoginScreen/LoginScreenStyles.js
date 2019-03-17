import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    width: 300,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    alignSelf: 'center'
  }
})
