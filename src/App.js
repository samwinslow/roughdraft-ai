import React from 'react'
import annyang from 'annyang'
import { HostedModel } from '@runwayml/hosted-models'
import './App.css';
import axios from 'axios'

const commands = {
  'hello': () => console.log('called')
}
const model = new HostedModel({
  url: 'https://sam-essays-1.hosted-models.runwayml.cloud/v1/',
  token: 'Pb1p+Jfd0VPzBzFmgajitg=='
})
const speech = axios.create()
speech.defaults.baseURL = "https://w8ylvqkryk.execute-api.us-east-1.amazonaws.com/dev/"
speech.defaults.timeout = 0

class App extends React.Component {
  state = {
    message: ''
  }

  queryModel = (prompt = '') => {
    console.log('called')
    model.query({
      prompt: this.state.message + prompt + ' ',
      max_characters: 140
    }).then((result) => {
      console.log(result)
      let message = result.generated_text.substring(0, result.generated_text.lastIndexOf(' ')) + ' '
      this.setState({
        message
      })
      this.speakMessage()
    })
  }

  speakMessage = async () => {
    const { message } = this.state
    const { data } = await speech.post('/speak', {
      text: message,
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
      let prompt = phrases[0]
      // this.setState({
      //   message: this.state.message + prompt
      // })
      this.queryModel(prompt)
    })
  }
  render() {
    const { message } = this.state
    return (
      <div className="App">
        <button onClick={() => this.queryModel()}>Submit</button>
        <button onClick={() => this.speakMessage()}>Speak</button>
        <br />
        <p>{message}</p>
      </div>
    )
  }
}

export default App;
