import { AsyncStorage } from 'react-native'
import { enableLogging } from 'mobx-logger'
import Config from '../Config/DebugConfig'
import AuthStore from './AuthStore'
import Api from '../Services/Api'
import { AsyncTrunk } from 'mobx-sync'
import { Actions } from 'react-native-router-flux'
import FixtureApi from '../Services/FixtureApi';

const __INITIAL_STATE__ = null

enableLogging({
  predicate: () => Config.mobxLogger,
  action: true,
  reaction: true,
  transaction: true,
  compute: true
})

export const api = Config.useFixtures ? FixtureApi : Api.create()
export const auth = new AuthStore(api)

export default stores = {
  auth
}

const persistStores = {
  auth
}

/**
 * @desc create an async trunk with custom options
 * @type {AsyncTrunk}
 */
const trunk = new AsyncTrunk(persistStores, {
  /**
   * @desc custom storage: built in storage is supported
   *  - localStorage
   *  - sessionStorage
   *  - ReactNative.AsyncStorage
   */
  storage: AsyncStorage,
  /**
   * @desc custom storage key, the default is `__mobx_sync__`
   */
  storageKey: '__persist_mobx_stores__',
  /**
   * @desc the delay time, use for mobx reaction
   */
  delay: 0
})

/**
 * @desc load persisted stores
 */
trunk.init(__INITIAL_STATE__).then(() => {
  /**
   * @desc do any staff with the loaded store,
   * and any changes now will be persisted
   * @type {boolean}
   */
  console.log('Stores loaded!')
  if (auth.user) {
    Actions.root({type: 'reset'})
  } else {
    Actions.login({type: 'reset'})
  }
})