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
      uuid: null,
      semesters: null,
      courses: null
    }
  }

  handleClick = (index) => {
    this.setState({currentSemester: index})
  }
  async doLoadFromDB () {
    this.setState({uuid: auth.currentUser.uid})
    await db.ref('/users/' + this.state.uuid).on('value', (snapshot) => {
      // console.log(Object.keys(snapshot.val().semesters))
      snapshot.val().semesters &&
        this.setState({semesters: Object.values(snapshot.val().semesters)})
      this.setState({semestersId: snapshot.val().semesters})
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
    await db.ref('/courses/').on('value', (snapshot) => {
      // console.log(snapshot.val())
      this.setState({courses: snapshot.val()})
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
  }

  componentWillMount () {
    setTimeout(() => this.doLoadFromDB(), 1000)
  }

  deleteCard = (Semester, objectName, index) => {
    console.log(Semester, objectName, this.state.semestersId)
    console.log(Object.keys(this.state.semestersId)[index])

    let foundIndex = Semester.classes.find((e, index) => {
      if (e.name === objectName.name) { console.log(index) }
    })

    let copyArray = this.state.semesters
    console.log(copyArray[this.state.currentSemester].classes)

    copyArray[this.state.currentSemester].classes.splice(foundIndex, 1)
    console.log(copyArray[this.state.currentSemester].classes.length)
    // this.setState({semesters: copyArray})
    if (copyArray[this.state.currentSemester].classes.length === 0) {
      console.log('e')
      db.ref('users/' + auth.currentUser.uid + '/semesters/' + Object.keys(this.state.semestersId)[index]).remove()
    } else {
      console.log('ef')
      db.ref('users/' + auth.currentUser.uid + '/semesters/' + Object.keys(this.state.semestersId)[index]).set(copyArray[this.state.currentSemester])
    }
    if (this.state.currentSemester > 0) { this.setState({currentSemester: this.state.currentSemester - 1}) }
    if (this.state.semesters.length === 1 && copyArray[this.state.currentSemester].classes.length === 0) { this.setState({semesters: null}) }
  }

  render () {
    return (
      <div>
        <Card.Group>
          <Card fluid style={{padding: '30px'}}>
            <p> Current Status: </p>
            <Progress percent={95} indicating progress label='you are almost there!' />
            <p>
            You have <b>3</b> credits left out of <b>128</b><br />
            You have over <b>126</b> credits.<br />
            if credits were <b>$300</b> each , then you have spent <b>$37,800</b> in your education.
            </p>
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
                      // console.log(index)
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
