import Api from '../Services/Api'
import FixtureApi from '../Services/FixtureApi'
import Config from '../Config/DebugConfig'

const api = Config.useFixtures ? FixtureApi : Api.create()

export default api
