// @cliDescription  Generates a store with an optional test.

module.exports = {
  description: 'Generates a React Native store.',
  run: async function (toolbox) {
    // grab some features
    const { parameters, print, strings, ignite } = toolbox
    const { pascalCase, isBlank } = strings

    // validation
    if (isBlank(parameters.first)) {
      print.info('A name is required.')
      print.info(`ignite generate store <name>\n`)
      return
    }

    const name = pascalCase(parameters.first)
    const props = { name }

    const jobs = [{ template: `store.ejs`, target: `App/Stores/${name}Store.js` }]

    // make the templates
    await ignite.copyBatch(toolbox, jobs, props)
  }
}
