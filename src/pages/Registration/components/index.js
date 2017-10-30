import React, {Component} from 'react'
import { Form, Button, Card } from 'semantic-ui-react'
import Background from '../../Login/components/background'
// import {Parent, Centerer, Footer} from '../../Main/components/index'
import styled from 'styled-components'
import fire from '../../../fire'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' }
]

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

class RForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fName: '',
      lName: '',
      email: '',
      pass: ''
    }
  }

  handleChange = (e, {name, value}) => { this.setState({[name]: value}) }
  // this needs to be on a different file 
  handleSubmit =() => {
    // well fuck it hhaahha
  }
  render () {
    const {pass, email} = this.state
    return (
      <span>
        <Background />
        <Parent>
          <Card>
            <Form style={{padding: '10px'}} onSubmit={this.handleSubmit}>
              <Centerer>Please Fill the form in order to register</Centerer>
              <Form.Input label='Email' placeholder='Email' name='email' value={email} onChange={this.handleChange} />
              <Form.Input label='Enter Password' type='password' name='pass' value={pass} onChange={this.handleChange} />
              <Form.Checkbox label='I agree to the Terms and Conditions' />
              <Form.Field control={Button} content='Confirm' />
            </Form>
          </Card>
        </Parent>

      </span>
    )
  }
}

export default RForm