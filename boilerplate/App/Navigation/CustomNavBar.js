import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Image, ViewPropTypes } from 'react-native'
import SearchActions from '../Redux/SearchRedux'
import styles from './Styles/CustomNavBarStyle'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
// import NavItems from './NavItems'
import { Actions } from 'react-native-router-flux'
import * as Animatable from 'react-native-animatable'
import SearchBar from '../Components/SearchBar'
import MarqueeText from 'react-native-marquee'

class CustomNavBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showSearchBar: false
    }
  }

  openDrawer () {
    Actions.drawerOpen()
  }

  back () {
    Actions.pop()
  }

  showSearchBar = () => {
    this.setState({ showSearchBar: true })
    this.props.showSearchBar()
  }

  cancelSearch = () => {
    this.setState({ showSearchBar: false })
    this.props.cancelSearch()
  }
  onClearText = () => {
    this.props.clearText()
  }

  onSearch = (searchTerm) => {
    this.props.performSearch(searchTerm)
  }

  renderSearchBar () {
    return (
      <Animatable.View duration={200} animation='slideInRight' style={styles.searchWrap}>
        <SearchBar
          onSearch={this.props.performSearch}
          searchTerm={this.props.searchTerm}
          onCancel={this.cancelSearch}
          onClearText={this.onClearText} />
      </Animatable.View>
    )
  }

  renderLeft () {
    const { backButton, menuButton } = this.props
    return (
      <View style={styles.leftWrapper}>
        {backButton ? this.renderBackButton() : menuButton ? this.renderMenuDrawerButton() : null}
      </View>
    )
  }

  renderBackButton () {
    return (
      <TouchableOpacity onPress={this.back.bind(this)} activeOpacity={0.7} style={styles.leftButton}>
        <Image source={Images.backButton} style={styles.iconBack} />
      </TouchableOpacity>
    )
  }

  renderMenuDrawerButton () {
    return (
      <TouchableOpacity onPress={this.openDrawer.bind(this)} activeOpacity={0.7} style={styles.leftButton}>
        <Image source={Images.hamburger} style={styles.iconMenu} />
      </TouchableOpacity>
    )
  }

  renderTitle () {
    if (this.props.renderTitle) {
      return (
        <View style={styles.titleWrapper}>
          {this.props.renderTitle()}
        </View>
      )
    } else {
      return (
        <View style={styles.titleWrapper}>
          <MarqueeText
            style={styles.title}
            duration={Metrics.marqueeTextDuration}
            marqueeOnStart
            loop
            useNativeDriver
          >
            {this.props.title}
          </MarqueeText>
        </View>
      )
    }
  }

  renderRight () {
    return (
      <View style={styles.rightWrapper}>
        <View style={styles.rightFlex} />
        {this.renderSearchButton()}
        {this.renderRightButton()}
      </View>
    )
  }

  renderRightButton () {
    if (this.props.rightButton) {
      return (
        <TouchableOpacity onPress={this.onRight.bind(this)} activeOpacity={0.7} style={styles.rightButton}>
          {this.props.rightButton()}
        </TouchableOpacity>

      )
    }
  }

  onRight () {
    this.props.onRight && this.props.onRight()
  }

  renderSearchButton () {
    if (this.props.searchButton) {
      return (
        <TouchableOpacity onPress={this.showSearchBar} activeOpacity={0.7} style={styles.searchButton}>
          <Image source={Images.searchButton} style={styles.iconSearch} />
        </TouchableOpacity>
      )
    }
  }

  render () {
    const { transparent, headerShadow } = this.props
    const style = [
      [styles.header, headerShadow ? styles.headerShadow : {}],
      transparent ? styles.headerTransparent : {},
      this.props.navStyle
    ]
    return (
      <View style={style}>
        {this.renderLeft()}
        {this.renderTitle()}
        {this.renderRight()}
        {this.state.showSearchBar ? this.renderSearchBar() : null}
      </View>
    )
  }
}

CustomNavBar.propTypes = {
  headerShadow: PropTypes.bool,
  navStyle: ViewPropTypes.style
}

CustomNavBar.defaultProps = {
  headerShadow: true
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.search.searchTerm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (searchTerm) => dispatch(SearchActions.search(searchTerm)),
    showSearchBar: () => dispatch(SearchActions.showSearchBar()),
    cancelSearch: () => dispatch(SearchActions.cancelSearch()),
    clearText: () => dispatch(SearchActions.clearText())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavBar)
