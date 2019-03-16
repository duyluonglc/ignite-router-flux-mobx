import '../Config'
import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import RootContainer from './RootContainer'
import Stores from '../Mobx'

/**
 * This is the root component of our app.
 */
class App extends Component {
  render () {
    return (
      <Provider
        // rootStore={rootStore}
        {...Stores}
      >
        <RootContainer />
      </Provider>
    )
  }
}

export default App
