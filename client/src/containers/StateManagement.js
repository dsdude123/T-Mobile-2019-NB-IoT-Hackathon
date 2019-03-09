import React from 'react'

export default class StateManagement extends React.Component {
  state = {
    devices: []
  }
  componentDidMount () {
    fetch('http://40.85.145.54:4000/api/v1/device?populate={"path":"checkins","sort":"timestamp"}')
      .then(res => res.json())
      .then(res => console.warn(res))
  }

  render () {
    return (
      <React.Fragment>
        {React.cloneElement(this.props.children, this.state)}
      </React.Fragment>
    )
  }
}
