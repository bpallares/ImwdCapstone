import React, {Component} from 'react'
import { Card, Button, Progress, Segment } from 'semantic-ui-react'
import a from '../../data'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentSemester: 0
    }
  }

  handleClick = (index) => {
    this.setState({currentSemester: index})
    // console.log(this.state.currentSemester)
  }

  render () {
    // console.log(a.classes[0].name)

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
            <Card.Content>
              <Card.Header>Current classes</Card.Header>
              <Card.Description>
                {a.semesters[this.state.currentSemester].classes.map((object, index) => (
                  <Segment key={index}>
                    <div>{object.name}</div>
                    <div style={{fontSize: '9px'}}>Course code: {object.code}</div>
                    <div style={{fontSize: '11px'}}>{object.days}</div>
                  </Segment>
                ))}
              </Card.Description>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <Card.Header>Semesters enrolled</Card.Header>
              <Card.Description>
                {a.semesters.map((object, index) => {
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
                })}
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    )
  }
}

export default Home
