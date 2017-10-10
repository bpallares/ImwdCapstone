import React, { Component } from 'react'
import AppRouting from '../src/SystemControl'
import { storageKey, auth } from '../src/fire'

class App extends Component {
  componentDidMount () {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid)
      } else {
        window.localStorage.removeItem(storageKey)
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
