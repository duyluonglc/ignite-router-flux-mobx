const constants = {
  PATTERN_IMPORTS: 'imports',
  PATTERN_ROUTES: 'routes'
}

module.exports = {
  constants,
  [constants.PATTERN_IMPORTS]: `import[\\s\\S]*from\\s+'react-native-router-flux';?`,
  [constants.PATTERN_ROUTES]: '\\<\\/Modal\\>'
}
