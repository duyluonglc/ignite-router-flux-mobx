import { observable, action, flow } from 'mobx'
import { Actions } from 'react-native-router-flux'
import { ignore } from 'mobx-sync'
import api from '../Services/ApiDefault'

export class AuthStore {
  // @desc this field is not persisted
  @ignore @observable isLoading = false

  @observable token = null
  @observable user = null

  @action checkLogged () {
    if (this.token && this.user) {
      Actions.root({ type: 'reset' })
    } else {
      Actions.login({ type: 'reset' })
    }
  }

  login = flow(function * (email, password) {
    this.isLoading = true
    const response = yield api.login(email, password)
    if (response.ok) {
      this.token = response.data.token
      this.user = response.data.user
      this.isLoading = false
      api.setToken(response.data.token)
      Actions.root({ type: 'reset' })
    } else {
      console.log('Login failure')
    }
  })

  @action logout () {
    Actions.login({ type: 'reset' })
    this.token = null
    this.user = null
  }
}

const auth = new AuthStore()
export default auth
