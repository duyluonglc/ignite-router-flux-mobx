import { observable, action, flow } from 'mobx'
import { Actions } from 'react-native-router-flux'
import { ignore } from 'mobx-sync'
import api from '../Services/ApiDefault'

export class AuthStore {
  // @desc this field is not persisted
  @ignore @observable isLoading = false

  @observable token = null
  @observable user = null

  /**
   * Check user already logged in
   */
  @action checkLogged () {
    if (this.token && this.user) {
      Actions.root({ type: 'reset' })
    } else {
      Actions.login({ type: 'reset' })
    }
  }

  /**
   * async function will transform to generate function
   * by babel-plugin-mobx-async-action
   *
   * @param {String} email
   * @param {String} password
   */
  @action
  async login (email, password) {
    this.isLoading = true
    const response = await api.login(email, password)
    if (response.ok) {
      this.token = response.data.token
      this.user = response.data.user
      this.isLoading = false
      api.setToken(response.data.token)
      Actions.root({ type: 'reset' })
    } else {
      console.log('Login failure')
    }
  }

  /**
   * logout
   */
  @action logout () {
    Actions.login({ type: 'reset' })
    this.token = null
    this.user = null
  }
}

const auth = new AuthStore()
export default auth
