import React, {Component} from 'react'
import { Button, Form, Segment, Dropdown } from 'semantic-ui-react'
import { firebaseApp, db, auth } from '../../fire'
import file from '../../utils/courses'

class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uuid: props.uid ? props.uid : null,
      message: null
    }
  }

  async doLoadFromDB () {
    await db.ref('/users/' + this.state.uuid).on('value', (snapshot) => {
      this.setState({username: snapshot.val().username})
      this.setState({email: snapshot.val().email})
      this.setState({semesters: snapshot.val().semesters})
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
  }

  componentWillReceiveProps (props) {
    this.setState({uuid: props.uid}, () => { this.doLoadFromDB() })
  }

  componentWillMount () {
    this.state.uuid && this.doLoadFromDB()
    let copyArray = []
    Object.keys(file.courses).map(e => {
      let structure = {
        key: '',
        value: '',
        text: ''
      }
      structure.key = file.courses[e].name
      structure.value = file.courses[e].name
      structure.text = file.courses[e].name
      copyArray.push(structure)
    })
    this.setState({major: copyArray})
  }
  handleChange = (e, { name, value, options }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    // console.log(this.state)
    if (!this.state.creditDollar || !this.state.limit || !this.state.majorSelected || !this.state.name || !this.state.lastname) {
      return this.setState({message: 'Fill the fields'})
    }
    const a = {
      creditDollar: this.state.creditDollar,
      email: this.state.email,
      name: this.state.name,
      lastname: this.state.lastname,
      limit: this.state.limit,
      majorSelected: this.state.majorSelected,
      semesters: this.state.semesters ? this.state.semesters : null,
      username: this.state.username
    }
    console.log(a)
    db.ref('users/' + this.state.uuid).set(a)
    this.setState({message: 'Success'})
  }
  render () {
    console.log(this.state)
    return (
      <Segment>
        <h1>Settings</h1>
        <Form>

          <Form.Input label='Username' disabled placeholder={this.state.username} />
          <span><b>Major</b></span><br />
          <Dropdown label='Major' placeholder='Major' search selection
            name='majorSelected'
            style={{marginBottom: '10px'}}
            options={this.state.major}
            onChange={this.handleChange}
          />
          <Form.Group widths={2}>
            <Form.Input label='First Name' placeholder='First Name' onChange={this.handleChange}
              name='name'

            />
            <Form.Input label='Last Name' placeholder='Last Name' onChange={this.handleChange}
              name='lastname'

            />
          </Form.Group>
          <Form.Input label='How many credits to graduate?' placeholder='0' type='number' min='1' max='1000' onChange={this.handleChange}
            name='limit'

          />
          <Form.Input label='How Much is the credit at your University?' placeholder='$0.0' type='number' min='1' max='1000' onChange={this.handleChange}
            name='creditDollar'

          />
          { this.state.message && (<span>{this.state.message}<br /><br /></span>)}

          <Button secondary onClick={this.handleSubmit}>Update</Button>
        </Form>
      </Segment>
    )
  }
}

export default Settings
