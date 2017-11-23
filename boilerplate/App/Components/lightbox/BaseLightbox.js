import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BackHandler, StyleSheet, Dimensions, DeviceEventEmitter, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {
  View,
  initializeRegistryWithDefinitions,
  registerAnimation,
  createAnimation
} from 'react-native-animatable'
import * as ANIMATION_DEFINITIONS from './animations'
// Override default animations
initializeRegistryWithDefinitions(ANIMATION_DEFINITIONS)

// Utility for creating custom animations
const makeAnimation = (name, obj) => {
  registerAnimation(name, createAnimation(obj))
}

const isObject = obj => {
  return obj !== null && typeof obj === 'object'
}

export default class BaseLightbox extends Component {
  static propTypes = {
    animationIn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    animationInTiming: PropTypes.number,
    animationOut: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    animationOutTiming: PropTypes.number,
    avoidKeyboard: PropTypes.bool,
    backdropColor: PropTypes.string,
    backdropOpacity: PropTypes.number,
    backdropTransitionInTiming: PropTypes.number,
    backdropTransitionOutTiming: PropTypes.number,
    renderContent: PropTypes.func.isRequired,
    onModalShow: PropTypes.func,
    onModalHide: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    backButtonClose: PropTypes.bool,
    onBackdropPress: PropTypes.func,
    backdropClose: PropTypes.bool,
    useNativeDriver: PropTypes.bool,
    style: PropTypes.any
  };

  static defaultProps = {
    animationIn: 'slideInUp',
    animationInTiming: 300,
    animationOut: 'slideOutDown',
    animationOutTiming: 300,
    avoidKeyboard: false,
    backdropColor: 'black',
    backdropOpacity: 0.7,
    backdropTransitionInTiming: 300,
    backdropTransitionOutTiming: 300,
    onModalShow: () => null,
    onModalHide: () => null,
    onBackdropPress: () => null,
    onBackButtonPress: () => null,
    useNativeDriver: false,
    backButtonClose: true,
    backdropClose: true
  };

  state = {
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Dimensions.get('window').height
  };

  transitionLock = null;

  constructor (props) {
    super(props)
    this._buildAnimations(props)
  }

  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.isOpen && this.props.backButtonClose) {
        this._close()
        return true
      }
      return false
    })
  }

  componentWillReceiveProps (nextProps) {
    if (
      this.props.animationIn !== nextProps.animationIn ||
      this.props.animationOut !== nextProps.animationOut
    ) {
      this._buildAnimations(nextProps)
    }
  }

  componentDidMount () {
    this._open()
    DeviceEventEmitter.addListener('didUpdateDimensions', this._handleDimensionsUpdate)
  }

  componentWillUnmount () {
    DeviceEventEmitter.removeListener('didUpdateDimensions', this._handleDimensionsUpdate)
  }

  // User can define custom react-native-animatable animations, see PR #72
  _buildAnimations = props => {
    let animationIn = props.animationIn
    let animationOut = props.animationOut

    if (isObject(animationIn)) {
      makeAnimation('animationIn', animationIn)
      animationIn = 'animationIn'
    }

    if (isObject(animationOut)) {
      makeAnimation('animationOut', animationOut)
      animationOut = 'animationOut'
    }

    this.animationIn = animationIn
    this.animationOut = animationOut
  };

  _handleDimensionsUpdate = dimensionsUpdate => {
    // Here we update the device dimensions in the state if the layout changed (triggering a render)
    const deviceWidth = Dimensions.get('window').width
    const deviceHeight = Dimensions.get('window').height
    if (deviceWidth !== this.state.deviceWidth || deviceHeight !== this.state.deviceHeight) {
      this.setState({ deviceWidth, deviceHeight })
    }
  }

  _open = () => {
    if (this.transitionLock) return
    this.transitionLock = true
    this.setState({ isOpen: true })
    this.backdropRef.transitionTo(
      { opacity: this.props.backdropOpacity },
      this.props.backdropTransitionInTiming
    )
    this.contentRef[this.animationIn](this.props.animationInTiming).then(() => {
      this.transitionLock = false
      this.props.onModalShow()
    })
  };

  _close = () => {
    if (this.transitionLock) return
    this.transitionLock = true
    this.setState({ isOpen: false })
    this.backdropRef.transitionTo({ opacity: 0 }, this.props.backdropTransitionOutTiming)
    this.contentRef[this.animationOut](this.props.animationOutTiming).then(() => {
      this.transitionLock = false
      Actions.pop()
      this.props.onModalHide()
    })
  };

  render () {
    const {
      animationIn,
      animationInTiming,
      animationOut,
      animationOutTiming,
      avoidKeyboard,
      backdropColor,
      backdropOpacity,
      backdropTransitionInTiming,
      backdropTransitionOutTiming,
      renderContent,
      onModalShow,
      onBackdropPress,
      onBackButtonPress,
      useNativeDriver,
      backdropClose,
      style,
      ...otherProps
    } = this.props
    const { deviceWidth, deviceHeight } = this.state

    const computedStyle = [
      { transform: [{ translateY: 0 }] },
      styles.content,
      style
    ]

    const containerView = (
      <View
        ref={ref => (this.contentRef = ref)}
        style={computedStyle}
        pointerEvents={'box-none'}
        useNativeDriver={useNativeDriver}
        {...otherProps}
      >
        {renderContent(this._close)}
      </View>
    )

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={backdropClose ? this._close : null}>
          <View
            ref={ref => (this.backdropRef = ref)}
            useNativeDriver={useNativeDriver}
            style={[
              styles.backdrop,
              {
                backgroundColor: backdropColor,
                width: deviceWidth,
                height: deviceHeight
              }
            ]}
          />
        </TouchableWithoutFeedback>
        {avoidKeyboard && (
          <KeyboardAvoidingView
            behavior={'padding'}
            pointerEvents={'box-none'}
            style={computedStyle.concat([{ margin: 0 }])}
          >
            {containerView}
          </KeyboardAvoidingView>
        )}

        {!avoidKeyboard && containerView}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    backgroundColor: 'black'
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  }
})
