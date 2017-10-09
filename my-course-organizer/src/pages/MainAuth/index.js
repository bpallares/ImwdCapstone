import React, {Component} from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router'

class MainAuth extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render () {
    return (
      <div >
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(MainAuth)
