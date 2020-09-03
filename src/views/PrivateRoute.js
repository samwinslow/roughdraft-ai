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
    return user ? <Route {...this.props} render={(props) => <View user={user} {...props} />}></Route> : <Redirect to="/" />
  }
}

export default PrivateRoute
