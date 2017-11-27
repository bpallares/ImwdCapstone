import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import UIDProvider from '../UIDProvider'
import Login from '../pages/Login'
import RegistrationForm from '../pages/Registration'
import Home from '../pages/Home'
import Settings from '../pages/Settings'
import NotFound from '../pages/NotFound'
import RequiredAuth, { NoAuth } from '../hocs/withAuth'
import MainAuth from '../pages/MainAuth'

const HomeComposed = () => (
  <UIDProvider>
    {(uid) => (
      <Home uid={uid} />
    )}
  </UIDProvider>
)

const AppLogDashboard = () => (
  <MainAuth>
    <Switch>
      <Route exact path='/' component={HomeComposed} />
      <Route exact path='/settings' component={Settings} />
      <Route component={NotFound} />
    </Switch>
  </MainAuth>
)

const AppRouting = () => (
  <Router>
    <Switch>
      <NoAuth exact path='/login' component={Login} />
      <NoAuth path='/registration' component={RegistrationForm} />
      <RequiredAuth path='/' component={AppLogDashboard} />
    </Switch>
  </Router>
)

export default AppRouting
