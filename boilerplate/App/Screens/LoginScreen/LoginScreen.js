import React, { Component } from 'react'
import { ScrollView, Image, View, TextInput, ActivityIndicator } from 'react-native'
import styles from './LoginScreenStyles'
import { Images } from '../../Themes'
import Button from 'react-native-button'
import { inject, observer } from 'mobx-react'

@inject('auth')
@observer
class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: 'test@email.com',
      password: 'testpassword'
    }
  }

  onPressLogin () {
    const { email, password } = this.state
    this.props.auth.login(email, password)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <TextInput
              style={styles.input}
              underlineColorAndroid='transparent'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid='transparent'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
            />
            {!this.props.auth.isLoading
              ? <Button onPress={() => this.onPressLogin()}>Login</Button>
              : <ActivityIndicator />
            }
          </View>

        </ScrollView>
      </View>
    )
  }
}

export default LoginScreen
