import React, { useState } from 'react'
import './App.css'
import annyang from 'annyang'
import { HostedModel } from '@runwayml/hosted-models'
import axios from 'axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import Sidebar from './components/Sidebar'
import theme from './constants/theme'

const commands = {
  'hello': () => console.log('called')
}
const model = new HostedModel({
  url: 'https://sam-essays-1.hosted-models.runwayml.cloud/v1',
  token: 'grcmC+iEn7w8MLhwmSEk7g=='
})
const speech = axios.create()
speech.defaults.baseURL = "https://w8ylvqkryk.execute-api.us-east-1.amazonaws.com/dev/"
speech.defaults.timeout = 0

class App extends React.Component {
  state = {
    message: '',
    prompt: ''
  }

  onChange = (content, delta, source, editor) => {
    this.setState({
      prompt: content
    })
  }

  queryModel = async () => {
    console.log('called')
    const { message, prompt } = this.state
    console.log(model.isAwake())
    model.query({
      prompt: message + prompt + ' ',
      max_characters: 140
    }).then((result) => {
      console.log(result)
      let nextMessage = result.generated_text.substring(0, result.generated_text.lastIndexOf(' ')) + ' '
      this.setState({
        prompt: '',
        message: nextMessage
      })
      console.log('prompt', prompt)
      this.speakMessage({
        omit: message + prompt
      })
    })
  }

  speakMessage = async (options = { omit: null }) => {
    const { message } = this.state
    var input = message
    if (options.omit) {
      input = message.replace(options.omit, '')
    }
    const { data } = await speech.post('/speak', {
      text: input,
      voice: 'Matthew'
    })
    if (data.url) {
      annyang.abort()
      let audio = new Audio(data.url)
      audio.addEventListener('ended', () => {
        annyang.resume()
      })
      audio.play()
    }
    console.log(data)
  }

  componentDidMount() {
    annyang.debug()
    annyang.addCommands(commands)
    // annyang.start()
    annyang.addCallback('result', (phrases) => {
      this.setState({
        prompt: phrases[0]
      })
      this.queryModel()
    })
  }
  render() {
    const { message, prompt } = this.state
    const documents = [
      {
        title: 'Hello World',
        isOpen: true,
        id: 'abcdef'
      },
      {
        title: 'Document two',
        isOpen: false,
        id: 'abcdef'
      },
      {
        title: 'The Communist Manifesto',
        isOpen: false,
        id: 'abcdef'
      },
    ]
    return (
      <div className="App">
        <Sidebar
          style={{ flex: 1 }}
          documents={documents}
        />
        <ReactQuill
          theme="bubble"
          style={{
            fontSize: theme.type.base.fontSize,
            fontFamily: theme.type.base.fontFamily,
            color: theme.colors.text,
            lineHeight: 1.618,
            height: '100vh',
            flex: 3,
            padding: '5rem',
          }}
          value={prompt}
          onChange={this.onChange}
        />
        <Sidebar
          style={{
            flex: 1
          }}
        />
        <button onClick={() => this.speakMessage()}>Speak</button>
        <br />
        <p>{message}</p>
      </div>
    )
  }
}

export default App;
