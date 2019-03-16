import { observable, action, asMap } from 'mobx'
import { Actions } from 'react-native-router-flux'
import { ignore } from 'mobx-sync'

export default class AuthStore {
  constructor (api) {
    this.api = api
  }
  // @desc this field is not persisted
  @ignore @observable isLoading = false

  @observable token = null
  @observable user = null

  @action async login (email, password) {
    this.isLoading = true
    const response = await this.api.login(email, password)
    if (response.ok) {
      this.token = response.data.token
      this.user = response.data.user
      this.isLoading = false
      this.api.setToken(response.data.token)
      Actions.root({ type: 'reset' })
    } else {
      console.log('Login failure')
    }
  }

  @action logout () {
    Actions.login({ type: 'reset' })
    this.token = null
    this.user = null
  }
}
