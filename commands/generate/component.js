module.exports = {
  description: 'Generates a component, supporting files, and a storybook test.',
  run: async function (toolbox) {
    // grab some features
    const { parameters, strings, print, ignite, patching } = toolbox
    const { pascalCase, isBlank } = strings

    // validation
    if (isBlank(parameters.first)) {
      print.info('A name is required.')
      print.info(`ignite generate component <name>\n`)
      return
    }

    const name = parameters.first
    const pascalName = pascalCase(name)

    const props = { name, pascalName }
    const jobs = [
      {
        template: 'component.ejs',
        target: `App/Components/${name}/${name}.js`
      },
      {
        template: 'component-style.ejs',
        target: `App/Components/${name}/${name}Style.js`
      }
    ]

    await ignite.copyBatch(toolbox, jobs, props)

    // wire up example
    // await patching.prepend(
    //   './storybook/storybook-registry.ts',
    //   `require("../app/components/${name}/${name}.story")\n`
    // )
  }
}
