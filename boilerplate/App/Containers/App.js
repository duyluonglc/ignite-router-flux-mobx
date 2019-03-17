import '../Config'
import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import RootContainer from './RootContainer'
import stores from '../Stores'

/**
 * This is the root component of our app.
 */
class App extends Component {
  render () {
    return (
      <Provider
        // rootStore={rootStore}
        {...stores}
      >
        <RootContainer />
      </Provider>
    )
  }
}

export default App
