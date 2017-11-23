import React from 'react'
import PropTypes from 'prop-types'
import { Image, Text, View } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/TabIconStyles'

const propTypes = {
  focused: PropTypes.bool
}

const TabIcon = (props) => {
  return (
    <View style={styles.container}>
      <Image source={props.image} style={[styles.imageIcon, props.focused ? styles.imageIconSelected : null]} />
      <Text allowFontScaling={false} style={props.focused ? styles.titleSelected : styles.title}>
        {props.tabLabel}
      </Text>
    </View>
  )
}

TabIcon.propTypes = propTypes

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabIcon)
