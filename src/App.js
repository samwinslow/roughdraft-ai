import React, { useState } from 'react'
import './App.css'
import annyang from 'annyang'
import { HostedModel } from '@runwayml/hosted-models'
import axios from 'axios'
import ReactQuill, { setEditorSelection } from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import theme from './constants/theme'
import Sidebar from './components/Sidebar'
import ActivityBar from './components/ActivityBar'

import {
  Menu,
  Popover,
  Position,
  TextDropdownButton,
  TextInput,
  RefreshIcon,
  RecordIcon,
  IconButton,
  Text,
  Button,
  Switch,
  toaster
} from 'evergreen-ui'
import RecognitionButton from './components/RecognitionButton'

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
const initialPromptState = '<h1><br></h1>'
const getSeed = () => {
  return Math.floor(Math.random() * 10000000).toString(16)
}

class App extends React.Component {
  state = {
    documents: [
      {
        title: 'Hello World',
        active: true,
        id: '4648ef'
      },
      {
        title: 'Document two',
        active: false,
        id: '45d1c0'
      },
      {
        title: 'The Communist Manifesto',
        active: false,
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
    selectedVoice: 'Matthew'
  }

  onChangeSelectedDocument = (id) => {
    const { documents } = this.state
    this.setState({
      documents: documents.map(document => ({
        ...document,
        active: id === document.id
      }))
    })
  }

  onEditorChange = (content, delta, source, editor) => {
    console.log(delta, content)
    if (content === '<p><br></p>') {
      content = initialPromptState
    }
    let titleMatch = content.match(/^(<h1>.*<\/h1>)/)
    if(titleMatch) {
      let title = editor.getText().split('\n')[0]
      if (!title.replace(/\s/g,'').length) title = 'New Document'
      document.title = title
    }
    this.setState({
      prompt: content
    })
    if (delta.ops[delta.ops.length - 1].insert === '/') {
      //TODO switch to special insert mode
    }
    // console.log(delta, content)
  }

  onKeyDown = (event) => {
    if (event.metaKey) {
      switch (event.key) {
        case 's':
          toaster.notify('Auto-saved')
          return event.preventDefault()
      }
    }
  }

  onSourceChange = (selected) => {
    this.setState({
      selectedSource: selected
    })
  }

  onMaxCharactersChange = (event) => {
    let maxCharacters = Math.max(1, Math.min(999, event.target.value))
    this.setState({
      maxCharacters
    })
  }

  onSeedChange = () => {
    this.setState({
      seed: getSeed()
    })
  }

  onTtsChange = () => {
    const { ttsEnabled } = this.state
    this.setState({
      ttsEnabled: !ttsEnabled
    })
  }

  onVoiceChange = (selected) => {
    this.setState({
      selectedVoice: selected
    })
  }

  onRecognitionButtonClick = () => {
    const { recognitionStatus } = this.state
    switch (recognitionStatus) {
      case 'disabled':
        this.setState({ recognitionStatus: 'pending' })
        return this.enableSpeechRecognition(true).then(success => {
          this.setState({ recognitionStatus: 'enabled' })
        }, err => {
          this.setState({ recognitionStatus: 'error' })
        })
      case 'enabled':
        this.setState({ recognitionStatus: 'pending' })
        return this.enableSpeechRecognition(false).then(success => {
          this.setState({ recognitionStatus: 'disabled' })
        }, err => {
          this.setState({ recognitionStatus: 'error' })
        })
    }
  }

  enableSpeechRecognition = async (status = true) => {
    return true
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

  setDocumentTitle = async (documentTitle) => {
    this.setState({
      documentTitle: 'New Document' // TODO
    })
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
    const {
      documents,
      selectedDocument,
      documentTitle,
      message,
      prompt,
      selectedSource,
      maxCharacters,
      seed,
      recognitionStatus,
      ttsEnabled,
      selectedVoice,
    } = this.state
    const activityGroups = [
      {
        title: 'Assistant Settings',
        children: [
          {
            title: 'Source',
            component: (
              <Popover
                position={Position.BOTTOM_LEFT}
                content={
                  <Menu>
                    <Menu.OptionsGroup
                      style={{ fontFamily: `${theme.type.base.fontFamily} !important`}}
                      options={[
                        { label: 'Personal Style', value: 'Personal Style' },
                        { label: 'Model Texts', value: 'Model Texts' }
                      ]}
                      selected={selectedSource}
                      onChange={this.onSourceChange}
                    />
                  </Menu>
                }
              >
                <TextDropdownButton style={{ fontFamily: theme.type.base.fontFamily}}>{selectedSource}</TextDropdownButton>
              </Popover>
            )
          },
          {
            title: 'Max Characters',
            component: (
              <TextInput
                height={24}
                style={{ width: '3.5rem' }}
                value={maxCharacters}
                onChange={this.onMaxCharactersChange}
                type="number" />
            )
          },
          {
            title: 'Seed',
            component: (
              <>
                <Text color="muted">{seed}</Text>
                <IconButton
                  icon={RefreshIcon}
                  height={24}
                  style={{ display: 'inline-flex', marginLeft: '0.5rem' }}
                  onClick={this.onSeedChange} />
              </>
            )
          },
        ]
      },
      {
        title: 'Speech Input',
        children: [
          {
            title: 'Recognition',
            component: (<RecognitionButton status={recognitionStatus} onClick={this.onRecognitionButtonClick} />)
          },
          {
            title: 'Speak Result',
            component: (<Switch checked={ttsEnabled} onChange={this.onTtsChange} height={20}></Switch>)
          },
          {
            title: 'Voice',
            component: (
              <Popover
                position={Position.BOTTOM_LEFT}
                content={
                  <Menu>
                    <Menu.OptionsGroup
                      style={{ fontFamily: `${theme.type.base.fontFamily} !important`}}
                      options={[
                        { label: 'Matthew', value: 'Matthew' },
                        { label: 'Joanna', value: 'Joanna' }
                      ]}
                      selected={selectedVoice}
                      onChange={this.onVoiceChange}
                    />
                  </Menu>
                }
              >
                <TextDropdownButton style={{ fontFamily: theme.type.base.fontFamily}}>{selectedVoice}</TextDropdownButton>
              </Popover>
            )
          }
        ]
      }
    ]

    return (
      <div className="App" onKeyDown={this.onKeyDown}>
        <Sidebar
          style={{ flex: 1 }}
          documents={documents}
          onChangeSelectedDocument={this.onChangeSelectedDocument}
        />
        <ReactQuill
          theme="bubble"
          style={{
            fontSize: theme.type.base.fontSize,
            fontFamily: theme.type.base.fontFamily,
            color: theme.colors.text,
            lineHeight: 1.618,
            height: '100vh',
            boxSizing: 'border-box',
            flex: 3,
            padding: '5rem',
          }}
          value={prompt}
          onChange={this.onEditorChange}
          onChangeSelection={this.onEditorChangeSelection}
        />
        <ActivityBar
          style={{ flex: 1 }}
          groups={activityGroups}
        />
        {/* <button onClick={() => this.speakMessage()}>Speak</button>
        <br />
        <p>{message}</p> */}
      </div>
    )
  }
}

export default App;
