import React from 'react'
import './App.css'
import Api from './config/Api.js'
import 'react-quill/dist/quill.bubble.css'
import { diff, getSeed } from './util'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import PrivateRoute from './views/PrivateRoute'
import DocView from './views/DocView'
import HomeView from './views/HomeView'
import PrivacyPageView from './views/PrivacyPageView'
import TermsPageView from './views/TermsPageView'
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from './aws-exports'

awsconfig.oauth.domain = 'auth.roughdraft.ai'
awsconfig.oauth.redirectSignIn = 'http://localhost:3000/authenticated'
awsconfig.oauth.redirectSignOut = 'http://localhost:3000/logout'
Amplify.configure(awsconfig)

const commands = {
  'hello': () => console.log('called')
}
const initialPromptState = '<h1><br></h1>'
const applicationApi = new Api()

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    user: null,
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({ user })
        console.log('Signed in!')
      }).catch(() => {
        this.setState({ user: null })
        console.log("Not signed in")
      })
  }

  render() {
    const { user } = this.state
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <HomeView />
            </Route>
            { this.state.user && (<PrivateRoute
              path="/doc"
              user={user}
              view={DocView}
            />)}
            <Route path="/privacy">
              <PrivacyPageView />
            </Route>
            <Route path="/terms">
              <TermsPageView />
            </Route>
            <Route path="/authenticated">
              <Redirect to="/doc" />
            </Route>
            <Route path="/logout">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
