import React, { Component } from 'react'
import AppRouting from '../src/SystemControl'
import { storageKey, auth } from './fire'

class App extends Component {
  componentWillMount () {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid)
      } else {
        console.log('logout')
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
