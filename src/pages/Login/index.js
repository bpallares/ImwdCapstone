import React from 'react'
import Login from '../Login/components/index'
import { connect } from 'react-redux'
import { addTodo } from '../../actions/index'

let Main = ({dispatch}) => (
  <Login />
)
Main = connect()(Main)
export default Main
