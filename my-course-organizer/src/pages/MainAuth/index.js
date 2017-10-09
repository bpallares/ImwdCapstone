import React, {Component} from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import {auth, storageKey} from '../../fire'

const Parent = styled.div`
  display:flex
`
const MainContainer = styled.div`

`

class MainAuth extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  move = () => {
    const { history } = this.props
    history.push('/404')
  }
  logout = () => {
    const { history } = this.props
    auth.signOut().then(function () {
      window.localStorage.removeItem(storageKey)
      history.push('/login')
    }).catch(function (error) {
      console.log(error)
    })
  }
  render () {
    const { history } = this.props

    return (
      <Parent>
        <Sidebar.Pushable >
          <Sidebar as={Menu} width='thin' visible icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad' onClick={this.move}>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='power' onClick={this.logout} >
              <Icon name='power' />
              Logout
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <div style={{ height: '-webkit-fill-available' }} >
                {this.props.children}
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Parent>

    )
  }
}

export default withRouter(MainAuth)
