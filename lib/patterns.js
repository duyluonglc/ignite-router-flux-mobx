const constants = {
  PATTERN_NAV_IMPORTS: 'imports',
  PATTERN_ROUTES: 'routes'
}

module.exports = {
  constants,
  [constants.PATTERN_NAV_IMPORTS]: `import[\\s\\S]*from\\s+'react-native-router-flux';?\\n`,
  [constants.PATTERN_ROUTES]: '\\s+\\<\\/Tabs\\>'
}
