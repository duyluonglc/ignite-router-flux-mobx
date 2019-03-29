// @cliDescription  Generates a store with an optional test.

module.exports = {
  description: 'Generates a React Native store.',
  run: async function (toolbox) {
    // grab some features
    const { parameters, print, strings, ignite, patching } = toolbox
    const { pascalCase, isBlank, camelCase } = strings

    // validation
    if (isBlank(parameters.first)) {
      print.info('A name is required.')
      print.info(`ignite generate store <name>\n`)
      return
    }

    const name = pascalCase(parameters.first)
    const camelName = camelCase(parameters.first)
    const props = { name }

    const jobs = [{ template: `store.ejs`, target: `App/Stores/${name}Store.js` }]

    // make the templates
    await ignite.copyBatch(toolbox, jobs, props)

    const storesFilePath = `${process.cwd()}/App/Stores/index.js`
    const importToAdd = `\nimport ${parameters.first} from './{name}Store'`
    const storeToAdd = `,\n  ${camelName}`

    // insert store import
    await patching.patch(storesFilePath, {
      after: /import\s+\w+\s+from\s+['"]\.\/\w+Store['"];?/,
      insert: importToAdd
    })

    // insert store
    await patching.patch(storesFilePath, {
      before: /\n\s*\}/,
      insert: storeToAdd
    })
  }
}
