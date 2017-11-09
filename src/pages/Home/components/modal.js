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
      semestersId: ''
    }
  }

  handleSubmit = () => {
    const {semesterDataIdentifiers} = this.props

    const toAdd = {
      classes: [{
        name: this.state.classSelected,
        code: this.state.code,
        days: 'MWF'
      }],
      name: `${this.state.semesterSelected} ${this.state.yearSelected}`
    }
    const semester = this.state.semesters

    if (!this.state.majorSelected || !this.state.classSelected || !this.state.semesterSelected || !this.state.yearSelected) {
      return console.log('Fill everything')
    }
    // console.log(this.state)
    if (this.state.semesters === null) {
      db.ref('users/' + auth.currentUser.uid + '/semesters').push(toAdd)
      this.setState({semesters: [toAdd]})
      return console.log('Added')
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
        code: this.state.code,
        days: 'MWF'
      })
      db.ref('users/' + auth.currentUser.uid + '/semesters/' + Object.keys(semesterDataIdentifiers)[indexUpdate]).set(semesterF)
    } else {
      db.ref('users/' + auth.currentUser.uid + '/semesters').push(toAdd)
    }

    /*
    if (this.state.semesters) {
      let Semesterfound = this.state.semesters.find((e) => e.name === `${this.state.semesterSelected} ${this.state.yearSelected}`)
      // Semesterfound ? console.log(Semesterfound) : console.log('nope')
      let repeatedClass = null
      Semesterfound ? (
        repeatedClass = Semesterfound.classes.find((e) => e.name === this.state.classSelected)
      ) : console.log('nothing')
      if (repeatedClass) { return console.log('you cant the same class 2 times per semester') }

      if (Semesterfound) {
        console.log('---------- 1 ---------')
        Semesterfound.classes.push({
          name: this.state.classSelected,
          code: this.state.code,
          days: 'MWF'
        })
        this.setState({semesters: [Semesterfound]})
        console.log('---------- 1 ---------')
      } else {
        console.log('---------- 2 ---------')
        semester.push(toAdd)
        console.log(semester)
        Semesterfound = semester
        console.log('---------- 2 ---------')
        this.setState({semesters: Semesterfound})
      }
      // this.setState({semesters: Semesterfound})
      console.log('Semester found ====>>', Semesterfound)
      // console.log('Semester found,,,, ====>>', this.state.semesters)

      db.ref('users/' + auth.currentUser.uid + '/semesters').set(this.state.semesters)
      // console.log('STATEEE', this.state)
    } */
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
    // console.log(this.state.classesLU)

    this.state.classesLU.find(findClassesMajor).majorClasses.map((objects) => {
      let structure = {
        key: '',
        value: '',
        text: ''
      }
      // console.log(objects)
      structure.key = objects.name
      structure.value = objects.name
      structure.text = objects.name
      copyArray.push(structure)
      this.setState({code: objects.code})
    })
    this.setState({ClassofMajor: copyArray})
  }
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render () {
    return (
      <Modal trigger={<Button fluid color='green'>Add</Button>}>
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
