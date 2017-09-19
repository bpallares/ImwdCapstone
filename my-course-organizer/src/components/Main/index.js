import React from 'react'
import { Button, Checkbox, Form, Card } from 'semantic-ui-react'
import styled from 'styled-components'
import Background from '../../components/Main/background'

const Parent = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  height:100vh;
`
const Centerer = styled.div`
  justify-content:center;
  margin-bottom: 20px;
`
const Footer = styled.div`
  margin-top: 20px;
`

const Main = () => (
  <div>
    <Background />
    <Parent>
      <Card>
        <Form style={{margin: '20px 20px 20px 20px'}}>
          <Centerer>
          Welcome to My Course Organizer
            <br />
          Please Log in or create an account
          </Centerer>
          <Form.Field>
            <label>Username</label>
            <input placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Last Name' />
          </Form.Field>
          <Button type='submit'>Login</Button>
          <Footer>
          Or Create an account here
          </Footer>
        </Form>
      </Card>
    </Parent>
  </div>
)
export default Main
