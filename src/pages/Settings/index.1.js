import React, {Component} from 'react'
import classes from '../../utils/courses.js'
import { db, auth } from '../../fire'

const schedule = ['MWF', 'MW', 'TH', 'F', 'MTWHF']

class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      courses: null
    }
  }
  componentWillMount () {
    this.setState({courses: classes.courses})
  }
  componentDidMount () {
    const classesInput = []
    const classesOffered = []
    Object.keys(this.state.courses).forEach((key) => {
      classesInput.push(this.state.courses[key].name)
      classesOffered.push(this.state.courses[key])
    })
    this.setState({classesOff: classesOffered})
    this.setState({majorNames: classesInput})
  }
  render () {
    // console.log(classes.courses['-Kx9wWfHT_jPjRPx6Zmd'].name)

    const arrOfOB = []
    this.state.classesOff &&
    this.state.classesOff.map((e, index) => {
      const aaaa = {
        majorName: null,
        majorClasses: []
      }
      aaaa.majorName = e.name

      Object.keys(e).forEach((key, index2) => {
        if (key !== 'name') {
          let a = Math.floor(Math.random() * (4 - 0 + 1)) + 0
          let b = Math.floor(Math.random() * (4 - 1 + 1)) + 1

          const classStructure = {
            name: null,
            code: null,
            days: schedule[a],
            credit: b

          }
          classStructure.name = e[key].name
          classStructure.code = `${index}S${index2}`
          aaaa['majorClasses'].push(classStructure)

          // return console.log(e.name, e[key].name)
        }
      })

      arrOfOB.push(aaaa)
    })
    db.ref('courses/').update(arrOfOB)
    console.log(arrOfOB)

    return (
      <span>
        {
          this.state.majorNames
            ? this.state.majorNames.map((object) => (<h6>{object}</h6>))
            : <h1>Loading</h1>
        }
      </span>
    )
  }
}

export default Settings
