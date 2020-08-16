import React from 'react'
import annyang from 'annyang'
import './App.css';

const commands = {
  'hello': () => console.log('called')
}

class App extends React.Component {
  state = {
    message: 'Annyang'
  }

  componentDidMount() {
    annyang.debug()
    annyang.addCommands(commands)
    annyang.start()
    annyang.addCallback('result', (phrases) => {
      console.log('phrase')
      this.setState({
        message: phrases[0]
      })
    })
  }
  render() {
    const { message } = this.state
    return (
      <div className="App">
        <h1>{message}</h1>
      </div>
    )
  }
}

export default App;
