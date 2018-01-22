import React, {Component} from 'react'
import { Card, Button, Progress, Segment } from 'semantic-ui-react'
// import a from '../../data'
import Modal from '../Home/components/modal'
import { firebaseApp, db, auth } from '../../fire'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentSemester: 0,
      uuid: props.uid ? props.uid : null,
      semesters: null,
      courses: null
    }
  }

  handleClick = (index) => {
    this.setState({currentSemester: index})
  }
  async doLoadFromDB () {
    await db.ref('/users/' + this.state.uuid).on('value', (snapshot) => {
      let counter = 0
      if (snapshot.val().semesters) {
        this.setState({semesters: Object.values(snapshot.val().semesters)})
        this.setState({semestersId: snapshot.val().semesters})
        this.setState({user: snapshot.val()})
        Object.values(snapshot.val().semesters).map((e) => e.classes.map(function (e) { counter += e.credit }))
      }
      this.setState({totalCredit: counter})
    }, function (errorObject) {
      return errorObject
    })
    await db.ref('/courses/').on('value', (snapshot) => {
      this.setState({courses: snapshot.val()})
    }, function (errorObject) {
      return errorObject.code
    })
  }

  componentWillReceiveProps (props) {
    this.setState({uuid: props.uid}, () => { this.doLoadFromDB() })
  }

  componentWillMount () {
    this.state.uuid && this.doLoadFromDB()
  }

  deleteCard = (Semester, objectName, index) => {
    let foundIndex = Semester.classes.find((e, index) => {
      if (e.name === objectName.name) { console.log(index) }
    })

    let copyArray = this.state.semesters

    copyArray[this.state.currentSemester].classes.splice(foundIndex, 1)
    if (copyArray[this.state.currentSemester].classes.length === 0) {
      db.ref('users/' + auth.currentUser.uid + '/semesters/' + Object.keys(this.state.semestersId)[index]).remove()
    } else {
      db.ref('users/' + auth.currentUser.uid + '/semesters/' + Object.keys(this.state.semestersId)[index]).set(copyArray[this.state.currentSemester])
    }
    if (this.state.currentSemester > 0) { this.setState({currentSemester: this.state.currentSemester - 1}) }
    if (this.state.semesters.length === 1 && copyArray[this.state.currentSemester].classes.length === 0) { this.setState({semesters: null}) }
  }

  render () {
    let percentage = 0
    let comment = ''
    if (this.state.totalCredit) {
      percentage = (this.state.totalCredit * this.state.user.limit) / 100

      if (percentage > 10 && percentage <= 20) {
        comment = 'You can do it'
      } else if (percentage >= 21 && percentage <= 50) {
        comment = 'Think about the rewards!'
      } else if (percentage > 51 && percentage < 100) {
        comment = 'almost there!'
      } else if (percentage === 100) {
        comment = 'Congratulations'
      }
    }

    return (
      <div>
        <Card.Group>
          <Card fluid style={{padding: '30px'}}>
            <p> Current Status: </p>
            {
              this.state.user ? (
                <span>
                  <Progress percent={percentage} indicating progress label={comment} />
                  <p>
                You have <b>{this.state.totalCredit}</b> credits out of <b>{this.state.user.limit}</b><br />
                You need to take <b>{this.state.user.limit}</b> credits to graduate.<br />
                if credits were <b>${this.state.user.creditDollar}</b> each , then you have spent <b>${this.state.user.creditDollar * this.state.totalCredit}</b> in your education.
                  </p>
                </span>)
                : (
                  <p>
                    please add classes to calculate your values
                  </p>
                )

            }
          </Card>

        </Card.Group>

        <Card.Group itemsPerRow={2}>
          <Card>
            <Card.Content extra>
              <Card.Header>Classes</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                {
                  this.state.semesters
                    ? this.state.semesters[this.state.currentSemester].classes.map((object, index) => (
                      <Segment key={index}>
                        <div style={{display: 'flex'}}>
                          <div>
                            <div>{object.name}</div>
                            <div style={{fontSize: '9px'}}>Course code: {object.code}</div>
                            <div style={{fontSize: '9px'}}>Course credit: {object.credit}</div>
                            <div style={{
                              fontSize: '11px',
                              backgroundColor: '#2185d0',
                              width: 'fit-content',
                              padding: '1.5px',
                              color: 'white',
                              fontWeight: '100'}}>{object.days}</div>
                          </div>
                          <div style={{
                            alignSelf: 'center',
                            marginLeft: 'auto',
                            height: 'auto'
                          }} ><Button inverted color='red' circular icon='delete' onClick={() => this.deleteCard(this.state.semesters[this.state.currentSemester], object, this.state.currentSemester)} /></div>
                        </div>
                      </Segment>
                    ))
                    : (<h1> No Classes </h1>)
                }
              </Card.Description>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content extra>
              <Card.Header>Semesters enrolled</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                {
                  this.state.semesters
                    ? this.state.semesters.map((object, index) => {
                      if (this.state.currentSemester === index) {
                        return (
                          <Segment key={index} color='green'>
                            <Button onClick={() => this.handleClick(index)} fluid >{object.name}</Button>
                          </Segment>

                        )
                      } else {
                        return (
                          <Segment key={index}>
                            <Button onClick={() => this.handleClick(index)} fluid >{object.name}</Button>
                          </Segment>
                        )
                      }
                    })
                    : (<h1> No Semesters </h1>)}
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>

        <Card.Group>
          <Card fluid>
            <Card.Content>
              <Card.Header>Add Classes</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                {
                  this.state.courses
                    ? <Modal classesOffered={this.state.courses} semesterData={this.state.semesters} semesterDataIdentifiers={this.state.semestersId} />
                    : <h1>loading</h1>

                }
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    )
  }
}

export default Home
