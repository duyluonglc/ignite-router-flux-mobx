// @cliDescription  Generates a store with an optional test.

module.exports = async function (context) {
  // grab some features
  const { parameters, ignite, print, strings } = context
  const { pascalCase, isBlank } = strings
  const config = ignite.loadIgniteConfig()
  const { tests } = config

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate store <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const props = { name }

  const jobs = [{ template: `store.ejs`, target: `App/Stores/${name}Store.js` }]
  if (tests) {
    jobs.push({
      // template: `store-test-${tests}.ejs`,
      // target: `Tests/Stores/${name}StoreTest.js`
    })
  }

  // make the templates
  await ignite.copyBatch(context, jobs, props)
}
