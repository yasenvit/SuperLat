import React, { Component } from 'react'

export default class Feedbacks extends Component {
  render() {
    return (
      <div className="feedbacks">
        {this.props.feedback ? this.props.feedback : "nothing to display"}
      </div>
    )
  }
}
