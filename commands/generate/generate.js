/**
 * This should never run, because Ignite's own `generate`
 * command should always take precedence. If it does run,
 * then we throw an error.
 *
 * We mainly want this command to allow for the "ignite g" alias.
 */
module.exports = {
  alias: ['g'],
  run: () => {
    throw new Error(`
      Error with "ignite generate" in ignite-router-flux-mobx
      
      please report issue at https://github.com/infinitered/ignite
    `)
  }
}
