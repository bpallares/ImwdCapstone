import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import Home from '../Main/index'

const AppRouting = () => (
  <Router>
    <Route path='/' component={Home} />
  </Router>
)

export default AppRouting
