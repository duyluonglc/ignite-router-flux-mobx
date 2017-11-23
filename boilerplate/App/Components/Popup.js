import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Animated } from 'react-native'
import styles from './Styles/PopupStyle'
import {Metrics} from '../Themes/'

export default class Popup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      offset: new Animated.Value(this.props.fromRight ? Metrics.screenWidth : -Metrics.screenHeight)
    }
  }

  componentDidMount () {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: 0
    }).start()
  }

  render () {
    return (
      <Animated.View style={[styles.container, { backgroundColor: 'rgba(52,52,52,0.5)' },
        { transform: [this.props.fromRight ? { translateX: this.state.offset } : { translateY: this.state.offset }] }]}>
        {this.props.children}
      </Animated.View>
    )
  }
}
