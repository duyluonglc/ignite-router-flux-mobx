// @cliDescription  Generates an opinionated container.

module.exports = {
  description: 'Generates a React Native screen.',
  run: async function (toolbox) {
    // grab some features
    const { parameters, print, strings, ignite, filesystem, patching } = toolbox
    const { pascalCase, isBlank, camelCase } = strings
    const config = ignite.loadIgniteConfig()

    // validation
    if (isBlank(parameters.first)) {
      print.info('A name is required.')
      print.info(`ignite generate screen <name>\n`)
      return
    }

    const name = parameters.first
    const screenName = name.endsWith('Screen') ? name : `${name}Screen`

    // prettier-ignore
    if (name.endsWith('Screen')) {
      print.info(`Note: For future reference, the \`*Screen\` suffix is automatically added for you.`)
      print.info(`You're welcome to add it manually, but we wanted you to know you don't have to. :)`)
    }

    // get permutations of the given model name
    const pascalName = pascalCase(screenName)
    const camelName = camelCase(screenName)

    const props = { name: screenName, pascalName, camelName }
    const jobs = [
      {
        template: `screen.ejs`,
        target: `App/Screens/${screenName}/${screenName}.js`
      },
      {
        template: `screen-style.ejs`,
        target: `App/Screens/${screenName}/${screenName}Style.js`
      }
    ]

    // make the templates
    await ignite.copyBatch(toolbox, jobs, props)

    // if using `react-navigation` go the extra step
    // and insert the screen into the nav router
    if (config.navigation === 'react-native-router-flux') {
      const appNavFilePath = `${process.cwd()}/App/Navigation/AppNavigation.js`
      const importToAdd = `import ${screenName} from '../Screens/${screenName}/${screenName}'\n`
      const routeToAdd = `\n            <Scene key='${camelCase(name)}' component={${screenName}} title='${pascalCase(name)}' back />`

      if (!filesystem.exists(appNavFilePath)) {
        const msg =
          `No '${appNavFilePath}' file found.  Can't insert screen.` +
          `Add your new screen manually to your navigation.`
        print.error(msg)
        process.exit(1)
      }

      // insert screen import
      await patching.patch(appNavFilePath, {
        after: /.*from\s['"]react-native-router-flux['"];?\n/,
        insert: importToAdd
      })

      // insert screen route
      await patching.patch(appNavFilePath, {
        before: /\n\s+<\/Modal>/,
        insert: routeToAdd
      })
    } else {
      print.info(`Screen ${screenName} created, manually add it to your navigation`)
    }
  }
}
