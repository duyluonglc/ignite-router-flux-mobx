import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/SearchBarStyles'
import { Colors, Images } from '../Themes/'

export default class SearchBar extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onClearText: PropTypes.func.isRequired,
    searchTerm: PropTypes.string
  }

  render () {
    const { onSearch, onCancel, searchTerm, onClearText } = this.props
    const onSubmitEditing = () => onSearch(searchTerm)
    return (
      <View style={styles.container}>
        <View style={styles.inputWrap}>
          <Image source={Images.iconSearch} style={styles.searchIcon} />
          <TextInput
            ref='searchText'
            autoFocus
            placeholder='Search'
            placeholderTextColor={Colors.snow}
            underlineColorAndroid='transparent'
            style={styles.searchInput}
            value={this.props.searchTerm}
            onChangeText={onSearch}
            autoCapitalize='none'
            onSubmitEditing={onSubmitEditing}
            returnKeyType={'search'}
            autoCorrect={false}
            selectionColor={Colors.snow}
          />
          {
            searchTerm && searchTerm.trim() ? (
              <TouchableOpacity activeOpacity={0.7} onPress={onClearText}>
                <Image source={Images.iconDelete} style={styles.clearTextIcon} />
              </TouchableOpacity>) : null
          }
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={onCancel} style={styles.cancelButton}>
          <Text style={styles.buttonLabel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
