import React, {Component} from 'react'
import { Button, Checkbox, Form, Card } from 'semantic-ui-react'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import Background from '../components/background'
import {auth} from '../../../fire'

export const Parent = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  height:100vh;
`
export const Centerer = styled.div`
  justify-content:center;
  margin-bottom: 20px;
`
export const Footer = styled.div`
  margin-top: 20px;
`

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      pass: ''
    }
  }

  handleChange = (e, {name, value}) => { this.setState({[name]: value}) }
  handleSubmit = () => {
    const { history } = this.props
    auth.signInWithEmailAndPassword(this.state.user, this.state.pass)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode === 'auth/wrong-password') {
          console.log('Wrong password.')
        } else {
          console.log(errorMessage)
        }
      }).then(function (user) {
        user ? history.push('/')
          : console.log('fails')
        // 
      })
  }
  render () {
    const {user, pass} = this.state
    return (
      <div>
        <Background />
        <Parent>
          <Card>
            <Form style={{margin: '20px 20px 20px 20px'}} onSubmit={this.handleSubmit}>
              <Centerer>
          Welcome to My Course Organizer
                <br />
          Please Log in or create an account
              </Centerer>
              <Form.Field >
                <label>Username</label>
                <Form.Input placeholder='First Name' name='user' value={user} onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <Form.Input type='password' placeholder='Last Name' name='pass' value={pass} onChange={this.handleChange} />
              </Form.Field>
              <Button type='submit'>Login</Button>
              <Footer>
              Or Create an account <a href='/registration'>here</a>
              </Footer>
            </Form>
          </Card>
        </Parent>
      </div>
    )
  }
}
export default withRouter(Login)
