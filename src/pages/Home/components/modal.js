import React, {Component} from 'react'
import { Button, Header, Modal, Dropdown } from 'semantic-ui-react'
import { db, auth } from '../../../fire'

const stateOptions = [
  { key: 'FA', value: 'FA', text: 'Fall' },
  { key: 'SU', value: 'SU', text: 'Summer' },
  { key: 'SP', value: 'SP', text: 'Spring' } ]
const year = [ { key: '2017', value: '2017', text: '2017' } ]

const major = [
  { key: 'CS', value: 'CS', text: 'Computer Science' },
  { key: 'GED', value: 'GED', text: 'General Education Class' }]

const classes = [
  { key: 'INT', value: 'INT', text: 'Intro to computer science' },
  { key: 'AST', value: 'AST', text: 'Anthropology' }]

class ModalBox extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  handleSubmit () {
    console.log(auth.currentUser.uid)
    db.ref('users/' + auth.currentUser.uid).update({
      semesters: [{
        name: 'Spring 2015',
        classes: [{
          name: 'Algebra',
          code: '1200',
          days: 'MWF'
        },
        {
          name: 'Algebra3',
          code: '1200',
          days: 'MWF'
        },
        {
          name: 'Algebra4',
          code: '1200',
          days: 'MWF'
        }]
      }]})
  }
  render () {
    return (
      <Modal trigger={<Button fluid color='green'>Add</Button>}>
        <Modal.Header>Add a class</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Semester</Header>
            <Dropdown placeholder='Semester' floating search selection options={stateOptions} style={{marginRight: '5px'}} />
            <Dropdown placeholder='Year' floating search selection options={year} />
            <Header>Search Class</Header>
            <Dropdown placeholder='Major' floating search selection options={major} style={{marginRight: '5px'}} />
            <Dropdown placeholder='Semester' floating search selection options={classes} style={{marginRight: '5px'}} />
            <br />
            <br />
            <Button.Group fluid>
              <Button >Cancel</Button>
              <Button.Or />
              <Button positive onClick={this.handleSubmit}>Save</Button>
            </Button.Group>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default ModalBox
