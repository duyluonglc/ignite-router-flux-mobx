const execa = require('execa')
const jetpack = require('fs-jetpack')
const tempy = require('tempy')

const IGNITE = 'ignite'
const APP = 'IntegrationTest'
const BOILERPLATE = `${__dirname}/..`

// calling the ignite cli takes a while
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

describe('without a linter', () => {
  beforeAll(async () => {
    // creates a new temp directory
    process.chdir(tempy.directory())
    await execa(IGNITE, ['new', APP, '--min', '--skip-git', '--no-lint', '--boilerplate', BOILERPLATE])
    process.chdir(APP)
  })

  test('does not have a linting script', async () => {
    expect(jetpack.read('package.json', 'json')['scripts']['lint']).toBe(undefined)
  })
})

describe('generators', () => {
  beforeAll(async () => {
    // creates a new temp directory
    process.chdir(tempy.directory())
    await execa(IGNITE, ['new', APP, '--min', '--skip-git', '--boilerplate', BOILERPLATE])
    process.chdir(APP)
  })

  test('generates a component', async () => {
    const simpleComponent = 'Simple'
    await execa(IGNITE, ['g', 'component', simpleComponent], { preferLocal: false })
    expect(jetpack.exists(`App/Components/${simpleComponent}.js`)).toBe('file')
    expect(jetpack.exists(`App/Components/Styles/${simpleComponent}Style.js`)).toBe('file')
    const lint = await execa('npm', ['-s', 'run', 'lint'])
    expect(lint.stderr).toBe('')
  })

  test('generates a folder component', async () => {
    const folderComponent = 'Folder'
    await execa(IGNITE, ['g', 'component', '--folder', folderComponent], { preferLocal: false })
    expect(jetpack.exists(`App/Components/${folderComponent}/index.js`)).toBe('file')
    expect(jetpack.exists(`App/Components/${folderComponent}/Styles/indexStyle.js`)).toBe('file')
    const lint = await execa('npm', ['-s', 'run', 'lint'])
    expect(lint.stderr).toBe('')
  })

  test('generates a component inside a folder', async () => {
    const componentName = 'InFolder'
    const folderName = 'Folder'
    await execa(IGNITE, ['g', 'component', '--folder', folderName, componentName], { preferLocal: false })
    expect(jetpack.exists(`App/Components/${folderName}/${componentName}.js`)).toBe('file')
    expect(jetpack.exists(`App/Components/${folderName}/Styles/${componentName}Style.js`)).toBe('file')
    const lint = await execa('npm', ['-s', 'run', 'lint'])
    expect(lint.stderr).toBe('')
  })

  test('generates a component in a relative path', async () => {
    await execa(IGNITE, ['g', 'component', 'My/SubFolder/Test'], { preferLocal: false })
    expect(jetpack.exists('App/Components/My/SubFolder/Test.js')).toBe('file')
    expect(jetpack.exists('App/Components/My/SubFolder/Styles/TestStyle.js')).toBe('file')
    const lint = await execa('npm', ['-s', 'run', 'lint'])
    expect(lint.stderr).toBe('')
  })

  test('generate store works', async () => {
    await execa(IGNITE, ['g', 'store', 'Test'], { preferLocal: false })
    expect(jetpack.exists('App/Mobx/TestStores.js')).toBe('file')
    const lint = await execa('npm', ['run', 'lint'])
    expect(lint.stderr).toBe('')
  })

  test('generate screen works', async () => {
    await execa(IGNITE, ['g', 'screen', 'Test'], { preferLocal: false })
    expect(jetpack.exists('App/Containers/TestScreen.js')).toBe('file')
    expect(jetpack.exists('App/Containers/Styles/TestScreenStyle.js')).toBe('file')
    const lint = await execa('npm', ['run', 'lint'])
    expect(lint.stderr).toBe('')
  })
})
