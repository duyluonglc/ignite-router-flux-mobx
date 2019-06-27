import { configure } from 'mobx'
import AsyncStorage from '@react-native-community/async-storage'
import { AsyncTrunk } from 'mobx-sync'
import { enableLogging } from 'mobx-logger'
import Config from '../Config/DebugConfig'
import R from 'ramda'
import stores from '../Stores'

// enable mobx logging
enableLogging({
  predicate: () => Config.mobxLogger && Boolean(window.navigator.userAgent),
  action: true,
  reaction: false,
  transaction: true,
  compute: true
})

configure({ enforceActions: 'always' })

const persistStores = ['auth']
const __INITIAL_STATE__ = null

export const appInit = () => {
  /**
   * @desc create an async trunk with custom options
   * @type {AsyncTrunk}
   */
  const trunk = new AsyncTrunk(R.pick(persistStores, stores), {
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
    delay: 100
  })

  /**
   * @desc load persisted stores
   */
  trunk.init(__INITIAL_STATE__).then(() => {
    /**
     * @desc do any staff with the loaded store,
     * and any changes now will be persisted
     */
    __DEV__ && console.log('Stores loaded!')
    const { auth } = stores
    // check user already logged in
    auth.checkLogged()
  })
}
