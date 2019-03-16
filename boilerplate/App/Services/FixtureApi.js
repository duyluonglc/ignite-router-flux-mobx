export default {
  setToken: token => null,
  // Functions return fixtures
  login: async (email, password) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ok: true,
          data: {
            token: 'sample_token',
            user: {
              email: 'test@mail.com',
              name: 'Test user'
            }
          }
        })
      }, 3000)
    })
  }
}
