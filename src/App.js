import React from 'react'
import annyang from 'annyang'
import { HostedModel } from '@runwayml/hosted-models'
import './App.css';
import axios from 'axios'

const commands = {
  'hello': () => console.log('called')
}
const model = new HostedModel({
  url: 'https://sam-essays-1.hosted-models.runwayml.cloud/v1',
  token: 'Pb1p+Jfd0VPzBzFmgajitg=='
})
const speech = axios.create()
speech.defaults.baseURL = "https://w8ylvqkryk.execute-api.us-east-1.amazonaws.com/dev/"
speech.defaults.timeout = 0

class App extends React.Component {
  state = {
    message: '',
    prompt: ''
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
    annyang.start()
    annyang.addCallback('result', (phrases) => {
      this.setState({
        prompt: phrases[0]
      })
      this.queryModel()
    })
  }
  render() {
    const { message, prompt } = this.state
    return (
      <div className="App">
        <form onSubmit={(event) => { this.queryModel(); event.preventDefault() }}>
          <input
            type="text"
            value={prompt}
            onChange={(event) => this.setState({ prompt: event.target.value })}
            onKeyPress={(event) => { if (event.key === 13) this.queryModel() }}
          />
          <input type="submit" value="Submit" />
        </form>
        <button onClick={() => this.speakMessage()}>Speak</button>
        <br />
        <p>{message}</p>
      </div>
    )
  }
}

export default App;
