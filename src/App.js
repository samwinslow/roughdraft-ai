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
    this.quillRef = React.createRef()
  }
  state = {
    documents: [
      {
        title: 'Hello World',
        id: '4648ef'
      },
      {
        title: 'Document two',
        id: '45d1c0'
      },
      {
        title: 'The Communist Manifesto',
        id: '6fb6e'
      },
    ],
    message: '',
    prompt: initialPromptState,
    selectedSource: 'Personal Style',
    maxCharacters: 140,
    seed: getSeed(),
    recognitionStatus: 'disabled', // 'disabled', 'pending', 'enabled', 'error'
    ttsEnabled: false,
    selectedVoice: 'Matthew',
    selectedDocument: '4648ef',
    documentTitle: 'New Document'
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
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
