import React, {Component} from 'react'
import { Button, Header, Modal, Dropdown } from 'semantic-ui-react'
import { db, auth } from '../../../fire'

const stateOptions = [
  { key: 'Fall', value: 'Fall', text: 'Fall' },
  { key: 'Summer', value: 'Summer', text: 'Summer' },
  { key: 'Spring', value: 'Spring', text: 'Spring' } ]
const year = [
  { key: '2017', value: '2017', text: '2017' },
  { key: '2018', value: '2018', text: '2018' },
  { key: '2019', value: '2019', text: '2019' },
  { key: '2020', value: '2020', text: '2020' },
  { key: '2021', value: '2021', text: '2021' },
  { key: '2022', value: '2022', text: '2022' } ]

let OptionMajor = []

class ModalBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ClassofMajor: [],
      majorSelected: '',
      classSelected: '',
      semesterSelected: '',
      yearSelected: '',
      code: '',
      semesters: '',
      semestersId: '',
      open: false

    }
  }

  handleSubmit = () => {
    const {semesterDataIdentifiers, classesOffered} = this.props
    const semester = this.state.semesters
    if (!this.state.majorSelected || !this.state.classSelected || !this.state.semesterSelected || !this.state.yearSelected) {
      return console.log('Fill everything')
    }

    // console.log(classesOffered)
    const classFinder = classesOffered.find((e, key) => e.majorName === this.state.majorSelected)

    const toAdd = {
      classes: [{
        name: this.state.classSelected,
        code: classFinder.majorClasses.find((e) => e.name === this.state.classSelected).code,
        days: classFinder.majorClasses.find((e) => e.name === this.state.classSelected).days,
        credit: classFinder.majorClasses.find((e) => e.name === this.state.classSelected).credit

      }],
      name: `${this.state.semesterSelected} ${this.state.yearSelected}`
    }

    // console.log(this.state)
    if (this.state.semesters === null) {
      db.ref('users/' + auth.currentUser.uid + '/semesters').push(toAdd)
      this.setState({semesters: [toAdd]})
      return console.log(toAdd)
    }

    let indexUpdate = null
    let semesterF = this.state.semesters.find((e, key) => {
      if (e.name === `${this.state.semesterSelected} ${this.state.yearSelected}`) {
        indexUpdate = key
        return e
      }
    })
    if (semesterF) {
      if (semesterF.classes.find((e) => e.name === this.state.classSelected)) { return console.log('cannot add multiple classes') }
      console.log(Object.keys(semesterDataIdentifiers)[indexUpdate])
      semesterF.classes.push({
        name: this.state.classSelected,
        code: classFinder.majorClasses.find((e) => e.name === this.state.classSelected).code,
        days: classFinder.majorClasses.find((e) => e.name === this.state.classSelected).days,
        credit: classFinder.majorClasses.find((e) => e.name === this.state.classSelected).credit

      })
      db.ref('users/' + auth.currentUser.uid + '/semesters/' + Object.keys(semesterDataIdentifiers)[indexUpdate]).set(semesterF)
      console.log(semesterF)
    } else {
      this.setState({semesters: [toAdd]})
      db.ref('users/' + auth.currentUser.uid + '/semesters').push(toAdd)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({semesters: nextProps.semesterData})
  }
  componentWillMount () {
    const {classesOffered, semesterData} = this.props
    this.setState({classesLU: classesOffered})
    this.setState({semesters: semesterData})
    // console.log(classesOffered)

    classesOffered.map((major) => {
      let structure = {
        key: '',
        value: '',
        text: ''
        // classes: []
      }
      structure.key = major.majorName
      structure.value = major.majorName
      structure.text = major.majorName
      OptionMajor.push(structure)
    })
    // console.log(OptionMajor)
  }

  handleChangeMajor = (e, {value}) => {
    this.setState({majorSelected: value})

    let copyArray = []
    function findClassesMajor (fruit) {
      return fruit.majorName === value
    }
    this.state.classesLU.find(findClassesMajor).majorClasses.map((objects) => {
      let structure = {
        key: '',
        value: '',
        text: ''
      }
      structure.key = objects.name
      structure.value = objects.name
      structure.text = objects.name
      copyArray.push(structure)
      this.setState({code: objects.code})
    })
    console.log(this.state.classesLU.find(findClassesMajor))
    this.setState({ClassofMajor: copyArray})
  }
  handleChange = (e, { name, value, options }) => {
    this.setState({ [name]: value })
  }

  flip = () => this.setState({ open: !this.state.open })

  render () {
    return (
      <Modal open={this.state.open} trigger={<Button fluid color='green' onClick={this.flip}>Add</Button>}>
        <Modal.Header>Add a class</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Semester</Header>
            {this.state.classesLU
              ? <span>
                <Dropdown placeholder='Semester' floating search selection
                  name='semesterSelected'
                  onChange={this.handleChange}
                  options={stateOptions}
                  style={{marginRight: '5px'}} />
                <Dropdown placeholder='Year' floating search selection
                  name='yearSelected'
                  onChange={this.handleChange}
                  options={year}
                />
                <Header>Search Class</Header>
                <Dropdown placeholder='Major' floating search selection
                  options={OptionMajor}
                  style={{marginRight: '5px'}}
                  onChange={this.handleChangeMajor}
                />{
                  this.state.ClassofMajor &&
                    <Dropdown placeholder='Semester' floating search selection
                      name='classSelected'
                      onChange={this.handleChange}
                      options={this.state.ClassofMajor}
                      style={{marginRight: '5px'}}
                    />
                }
              </span>
              : <h1>Loading</h1>
            }
            <br />
            <br />
            <Button.Group fluid>
              <Button onClick={this.flip} >Cancel</Button>
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
