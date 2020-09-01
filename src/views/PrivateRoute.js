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
    const View = this.props.view
    const { user } = this.props
    return user ? <View user={user} /> : <Redirect to="/" />
  }
}

export default PrivateRoute
