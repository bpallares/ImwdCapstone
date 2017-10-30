import React, {Component} from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import {auth, storageKey} from '../../fire'
import { Link } from 'react-router-dom'

const Parent = styled.div`
  display:flex
`
const MainContainer = styled.div`

`

class MainAuth extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: true
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
  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render () {
    const { history } = this.props
    return (
      <div>
        <Sidebar as={Menu} animation='overlay' width='thin' visible icon='labeled' vertical inverted>
          <Menu.Item name='home'>
            <Icon name='home' />
             Home
          </Menu.Item>
          <Menu.Item name='gamepad' link >
            <Icon name='gamepad' />
            <Link to='/404'>Games</Link>
          </Menu.Item>
          <Menu.Item name='power' onClick={this.logout} >
            <Icon name='power' />
             Logout
          </Menu.Item>
        </Sidebar>
        <div style={{ height: '-webkit-fill-available', marginLeft: '150px', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px' }} >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default withRouter(MainAuth)

/** <Parent>
        <Sidebar.Pushable>
          <Sidebar as={Menu} width='thin' visible icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad' link >
              <Icon name='gamepad' />
              <Link to='/404'>Games</Link>
            </Menu.Item>
            <Menu.Item name='power' onClick={this.logout} >
              <Icon name='power' />
              Logout
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment style={{width: 'auto'}}>
              <div style={{ height: '-webkit-fill-available', width: 'auto' }} >
                {this.props.children}
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Parent> **/
