import React from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/TabIconStyles'
import { Colors } from '../../Themes'

class TabIcon extends React.Component {
  static propTypes = {
    focused: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
  }

  render () {
    const { focused, imageSource, label } = this.props
    return (
      <View style={[styles.tabIconActive]}>
        <Image source={imageSource} style={[styles.imageIcon, { tintColor: focused ? Colors.primaryColor : '#607D8B' }]} />
        <Text numberOfLines={1} style={[styles.label, { color: focused ? Colors.primaryColor : '#607D8B' }]}>{label}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabIcon)
