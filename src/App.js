import React, { Component } from 'react'
import AppRouting from '../src/SystemControl'
import { storageKey, auth } from './fire'

class App extends Component {
  state = {
    uid: null
  }

  static childContextTypes = {
    uid: React.PropTypes.string
  }

  getChildContext () {
    return {uid: this.state.uid}
  }
  componentWillMount () {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid)
        this.setState({uid: user.uid})
      } else {
        console.log('logout')
        window.localStorage.removeItem(storageKey)
        this.setState({uid: null})
      }
    })
  }

  render () {
    return (
      <AppRouting />
    )
  }
}
export default App
