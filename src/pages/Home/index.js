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
      semesters: null
    }
  }

  handleClick = (index) => {
    this.setState({currentSemester: index})
  }
  async doShit () {
    this.setState({uuid: auth.currentUser.uid})
    await db.ref('/users/' + this.state.uuid).on('value', (snapshot) => {
      console.log(snapshot.val())
      this.setState({semesters: snapshot.val().semesters})
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
  }

  // this.setState({semesters: snapshot.val().semesters})

  componentWillMount () {
    setTimeout(() => this.doShit(), 1000)
  }

  render () {
    return (
      <div>
        <Card.Group>
          <Card fluid style={{padding: '30px'}}>
            <p> Current Status: </p>
            <Progress percent={78} indicating progress label='you are almost there!' />
          </Card>
        </Card.Group>

        <Card.Group itemsPerRow={2}>
          <Card>
            <Card.Content extra>
              <Card.Header>Classes</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                { /*
                  a
                    ? a.semesters[this.state.currentSemester].classes.map((object, index) => (
                      <Segment key={index} color='green'>
                        <div>{object.name}</div>
                        <div style={{fontSize: '9px'}}>Course code: {object.code}</div>
                        <div style={{
                          fontSize: '11px',
                          backgroundColor: '#2185d0',
                          width: 'fit-content',
                          padding: '1.5px',
                          color: 'white',
                          fontWeight: '100'}}>{object.days}</div>
                      </Segment>
                    ))
                  : (<h1> No Classes </h1>) */
                  this.state.semesters
                    ? this.state.semesters[this.state.currentSemester].classes.map((object, index) => (
                      <Segment key={index} color='green'>
                        <div>{object.name}</div>
                        <div style={{fontSize: '9px'}}>Course code: {object.code}</div>
                        <div style={{
                          fontSize: '11px',
                          backgroundColor: '#2185d0',
                          width: 'fit-content',
                          padding: '1.5px',
                          color: 'white',
                          fontWeight: '100'}}>{object.days}</div>
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

        <Card.Group itemsPerRow={1}>
          <Card>
            <Card.Content>
              <Card.Header>Add Classes</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                <Modal />
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    )
  }
}

export default Home
