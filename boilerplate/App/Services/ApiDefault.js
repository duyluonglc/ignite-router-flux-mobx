import Api from '../Services/Api'
import FixtureApi from '../Services/FixtureApi'
import Config from '../Config/DebugConfig'

let api = Api.create()
if (Config.useFixtures) {
  api = FixtureApi
}

export default api
