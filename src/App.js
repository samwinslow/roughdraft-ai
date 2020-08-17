import React from 'react'
import annyang from 'annyang'
import { HostedModel } from '@runwayml/hosted-models'
import './App.css';

const commands = {
  'hello': () => console.log('called')
}

const model = new HostedModel({
  url: 'https://sam-essays-1.hosted-models.runwayml.cloud/v1/',
  token: 'Pb1p+Jfd0VPzBzFmgajitg=='
})

class App extends React.Component {
  state = {
    message: ''
  }

  queryModel = (prompt = '') => {
    console.log('called')
    model.query({
      prompt: this.state.message + prompt,
      max_characters: 140
    }).then((result) => {
      console.log(result)
      this.setState({
        message: result.generated_text
      })
    })
  }

  componentDidMount() {
    annyang.debug()
    annyang.addCommands(commands)
    annyang.start()
    annyang.addCallback('result', (phrases) => {
      let prompt = phrases[0] + ' '
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
        <p>{message}</p>
      </div>
    )
  }
}

export default App;
