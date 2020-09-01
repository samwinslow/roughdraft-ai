//TODO
// https://ui.dev/react-router-v4-protected-routes-authentication/
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Auth } from 'aws-amplify'

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return this.props.user ? this.props.children : <Redirect to="/" />
  }
}

export default PrivateRoute
