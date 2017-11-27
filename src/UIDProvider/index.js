import React, {Component} from 'react'

class UIDProvider extends Component {
  static contextTypes = {
    uid: React.PropTypes.string
  }

  render () {
    return this.props.children(this.context.uid)
  }
}
export default UIDProvider
