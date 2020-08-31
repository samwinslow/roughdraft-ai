import React from 'react'
import './App.css'
import Api from './config/Api.js'
import 'react-quill/dist/quill.bubble.css'
import { diff, getSeed } from './util'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import DocView from './views/DocView'
import HomeView from './views/HomeView'
import PrivacyPageView from './views/PrivacyPageView'
import TermsPageView from './views/TermsPageView'
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from './aws-exports'

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
    
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <HomeView />
            </Route>
            <Route path="/doc">
              <DocView />
            </Route>
            <Route path="/privacy">
              <PrivacyPageView />
            </Route>
            <Route path="/terms">
              <TermsPageView />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
