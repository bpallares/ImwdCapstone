import React, {Component} from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

class Settings extends Component {
  render () {
    return (
      <Segment>
        <h1>Settings</h1>
        <Form>
          <Form.Group widths={2}>
            <Form.Input label='First Name' placeholder='First Name' />
            <Form.Input label='Last Name' placeholder='Last Name' />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input label='First Name' placeholder='First Name' />
            <Form.Input label='Last Name' placeholder='Last Name' />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input label='First Name' placeholder='First Name' />
            <Form.Input label='Last Name' placeholder='Last Name' />
          </Form.Group>
          <Button secondary>Sign Up</Button>
        </Form>
      </Segment>
    )
  }
}

export default Settings
