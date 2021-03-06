// const options = require('./options')
const { merge, pipe, assoc, omit, __ } = require('ramda')
const { getReactNativeVersion } = require('./lib/react-native-version')

/**
 * Is Android installed?
 *
 * $ANDROID_HOME/tools folder has to exist.
 *
 * @param {*} context - The gluegun context.
 * @returns {boolean}
 */
const isAndroidInstalled = function (context) {
  const androidHome = process.env['ANDROID_HOME']
  const hasAndroidEnv = !context.strings.isBlank(androidHome)
  const hasAndroid = hasAndroidEnv && context.filesystem.exists(`${androidHome}/tools`) === 'dir'

  return Boolean(hasAndroid)
}

/**
 * Let's install.
 *
 * @param {any} context - The gluegun context.
 */
async function install (context) {
  const {
    filesystem,
    parameters,
    ignite,
    reactNative,
    print,
    system,
    template
  } = context
  const { colors } = print
  const { red, yellow, bold, gray } = colors

  const perfStart = (new Date()).getTime()
  const name = parameters.first
  const spinner = print
    .spin(`using the ${red('Infinite Red')} boilerplate router-flux-mobx`)
    .succeed()

  // attempt to install React Native or die trying
  const rnInstall = await reactNative.install({
    name,
    version: getReactNativeVersion(context),
    useNpm: !ignite.useYarn
  })
  if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode)

  // remove the __tests__ directory and App.js that come with React Native
  filesystem.remove('__tests__')
  filesystem.remove('App.js')

  // copy our App, Tests & storybook directories
  spinner.text = '▸ copying files'
  spinner.start()
  filesystem.copy(`${__dirname}/boilerplate/App`, `${process.cwd()}/App`, {
    overwrite: true,
    matching: '!*.ejs'
  })
  filesystem.copy(`${__dirname}/boilerplate/Tests`, `${process.cwd()}/Tests`, {
    overwrite: true,
    matching: '!*.ejs'
  })
  filesystem.copy(`${__dirname}/boilerplate/storybook`, `${process.cwd()}/storybook`, {
    overwrite: true,
    matching: '!*.ejs'
  })
  spinner.stop()

  // generate some templates
  spinner.text = '▸ generating files'
  const templates = [
    { template: 'index.js.ejs', target: 'index.js' },
    { template: 'README.md', target: 'README.md' },
    { template: '.editorconfig', target: '.editorconfig' },
    { template: 'babel.config.js', target: 'babel.config.js' },
    { template: 'Tests/Setup.js.ejs', target: 'Tests/Setup.js' },
    { template: 'storybook/storybook.ejs', target: 'storybook/storybook.js' },
    { template: '.env.example', target: '.env.example' }
  ]
  const templateProps = {
    name,
    igniteVersion: ignite.version,
    reactNativeVersion: rnInstall.version
  }
  await ignite.copyBatch(context, templates, templateProps, {
    quiet: true,
    directory: `${ignite.ignitePluginPath()}/boilerplate`
  })

  /**
   * Append to files
   */
  // https://github.com/facebook/react-native/issues/12724
  filesystem.appendAsync('.gitattributes', '*.bat text eol=crlf')
  filesystem.append('.gitignore', '\n# Misc\n#')
  filesystem.append('.gitignore', '\n.env')
  filesystem.append('.gitignore', '\npackage-lock.json')
  filesystem.append('.gitignore', '\nyarn.lock')
  filesystem.append('.gitignore', '\nios/Podfile.lock')
  filesystem.append('.gitignore', '\nios/Pods\n')

  /**
   * Merge the package.json from our template into the one provided from react-native init.
   */
  async function mergePackageJsons () {
    // transform our package.json in case we need to replace variables
    const rawJson = await template.generate({
      directory: `${ignite.ignitePluginPath()}/boilerplate`,
      template: 'package.json.ejs',
      props: templateProps
    })
    const newPackageJson = JSON.parse(rawJson)

    // read in the react-native created package.json
    const currentPackage = filesystem.read('package.json', 'json')

    // deep merge, lol
    const newPackage = pipe(
      assoc(
        'dependencies',
        merge(currentPackage.dependencies, newPackageJson.dependencies)
      ),
      assoc(
        'devDependencies',
        merge(currentPackage.devDependencies, newPackageJson.devDependencies)
      ),
      assoc('scripts', merge(currentPackage.scripts, newPackageJson.scripts)),
      merge(
        __,
        omit(['dependencies', 'devDependencies', 'scripts'], newPackageJson)
      )
    )(currentPackage)

    // write this out
    filesystem.write('package.json', newPackage, { jsonIndent: 2 })
  }
  await mergePackageJsons()

  spinner.stop()

  // react native link -- must use spawn & stdio: ignore or it hangs!! :(
  spinner.text = `▸ linking native libraries`
  spinner.start()
  await system.spawn('react-native link', { stdio: 'ignore' })
  spinner.stop()

  // pass long the debug flag if we're running in that mode
  const debugFlag = parameters.options.debug ? '--debug' : ''

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // NOTE(steve): I'm re-adding this here because boilerplates now hold permanent files
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  try {
    // boilerplate adds itself to get plugin.js/generators etc
    // Could be directory, npm@version, or just npm name.  Default to passed in values
    const boilerplate = parameters.options.b || parameters.options.boilerplate || 'ignite-ir-boilerplate-andross'

    await system.spawn(`ignite add ${boilerplate} ${debugFlag}`, { stdio: 'inherit' })

    await ignite.addModule('react-native-gesture-handler', { version: '1.2.1', link: true })
    // react native link -- must use spawn & stdio: ignore or it hangs!! :(
    spinner.text = `▸ linking native libraries`
    spinner.start()
    await system.spawn('react-native link', { stdio: 'ignore' })
    spinner.stop()

    ignite.patchInFile(`${process.cwd()}/android/app/src/main/java/com/${name.toLowerCase()}/MainActivity.java`, {
      after: 'import com.facebook.react.ReactActivity;',
      insert: `
      import com.facebook.react.ReactActivityDelegate;
      import com.facebook.react.ReactRootView;
      import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;`
    })

    ignite.patchInFile(`${process.cwd()}/android/app/src/main/java/com/${name.toLowerCase()}/MainActivity.java`, {
      after: `public class MainActivity extends ReactActivity {`,
      insert: '\n  @Override\n' +
        '  protected ReactActivityDelegate createReactActivityDelegate() {\n' +
        '    return new ReactActivityDelegate(this, getMainComponentName()) {\n' +
        '      @Override\n' +
        '      protected ReactRootView createRootView() {\n' +
        '       return new RNGestureHandlerEnabledRootView(MainActivity.this);\n' +
        '      }\n' +
        '    };\n' +
        '  }'
    })
  } catch (e) {
    ignite.log(e)
    print.error(`
      There were errors while generating the project. Run with --debug to see verbose output.
    `)
    throw e
  }

  // re-run yarn
  const installDeps = ignite.useYarn ? 'yarn' : 'npm install'
  await system.run(installDeps)
  spinner.succeed(`Installed dependencies`)

  // re-run react-native link
  await system.spawn('react-native link', { stdio: 'ignore' })
  spinner.succeed(`Linked dependencies`)

  const perfDuration = parseInt(((new Date()).getTime() - perfStart) / 10) / 100
  spinner.succeed(`ignited ${yellow(name)} in ${perfDuration}s`)

  const androidInfo = isAndroidInstalled(context) ? ''
    : `\n\nTo run in Android, make sure you've followed the latest react-native setup instructions at https://facebook.github.io/react-native/docs/getting-started.html before using ignite.\nYou won't be able to run ${bold('react-native run-android')} successfully until you have.`

  const successMessage = `
    ${red('Ignite CLI')} ignited ${yellow(name)} in ${gray(`${perfDuration}s`)}

    To get started:

      cd ${name}
      react-native run-ios
      react-native run-android${androidInfo}
      ignite --help

    ${bold('Now get cooking! 🍽')}
    
    ${gray('(Running yarn/npm install one last time to make sure everything is installed -- please be patient!)')}
  `

  print.info(successMessage)
}

module.exports = {
  install
}
