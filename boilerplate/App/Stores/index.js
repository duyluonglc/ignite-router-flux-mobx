import Config from '../Config/DebugConfig'
import AuthStore from './AuthStore'
import Api from '../Services/Api'
import FixtureApi from '../Services/FixtureApi'

export const api = Config.useFixtures ? FixtureApi : Api.create()
export const auth = new AuthStore(api)

const stores = {
  auth
}

export default stores
