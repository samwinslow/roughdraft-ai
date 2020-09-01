import React from 'react'
import '../App.css'
import Api from '../config/Api.js'
import debounce from 'lodash/debounce'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import theme from '../constants/theme'
import Sidebar from '../components/Sidebar'
import ActivityBar from '../components/ActivityBar'
import { diff, getSeed } from '../util'
import {
  Menu,
  Popover,
  Position,
  TextDropdownButton,
  TextInput,
  RefreshIcon,
  IconButton,
  Text,
  Switch,
  toaster
} from 'evergreen-ui'
import { Auth, Storage } from 'aws-amplify'

const commands = {
  'hello': () => console.log('called')
}
const initialPromptState = '<h1><br></h1>'
const applicationApi = new Api()

class DocView extends React.Component {
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

  onChangeSelectedDocument = (id) => {
    this.setState({
      selectedDocument: id
    })
  }

  onEditorChange = (content, delta, source, editor) => {
    if (content === '<p><br></p>') {
      content = initialPromptState
    }
    let titleMatch = content.match(/^(<h1>.*<\/h1>)/)
    if(titleMatch) {
      let title = editor.getText().split('\n')[0]
      if (!title.replace(/\s/g,'').length) title = 'New Document'
      this.setDocumentTitle(title.substring(0, 140))
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
          // TODO save
          toaster.notify('Auto-saved', {
            id: 'save-action'
          })
          return event.preventDefault()
      }
    }
  }

  onEditorKeyDown = (event) => {
    switch (event.key) {
      case 'Tab':
        this.queryModel()
        return event.preventDefault()
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

  queryModel = async () => {
    const { editor } = this.quillRef.current
    const { maxCharacters, seed } = this.state
    toaster.notify('Generating text...', {
      id: 'model-status'
    })
    try {
      const selection = editor.getSelection()
      const insertIndex = selection ? selection.index + selection.length : initialText.length
      const initialText = editor.getText().substring(0, insertIndex)
      let result = await applicationApi.queryModel(initialText, maxCharacters, seed)
      if (result.generated_text) {
        toaster.success('Generated text!', {
          id: 'model-status'
        })
        editor.insertText(insertIndex, diff(result.generated_text, initialText))
      }
    } catch(err) {
      toaster.danger('Error generating text', {
        id: 'model-status'
      })
      console.log(err)
    }
  }

  setDocumentTitle = debounce(newTitle => {
    const { selectedDocument, documents } = this.state
    this.setState({
      documentTitle: newTitle, // TODO
      documents: documents.map(document => ({
        ...document,
        title: document.id === selectedDocument ? newTitle : document.title
      }))
    })
    document.title = newTitle
  }, 500)

  componentDidMount() {
    const { editor } = this.quillRef.current
    editor.focus()
    delete editor.keyboard.bindings['9'] // 9: Tab
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
    const {
      user
    } = this.props
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
    ]

    return (
      <div className="DocView" onKeyDown={this.onKeyDown} style={{
        height: '100vh',
      }}>
        <Sidebar
          user={user}
          documents={documents}
          selectedDocument={selectedDocument}
          onChangeSelectedDocument={this.onChangeSelectedDocument}
        />
        <ReactQuill
          ref={this.quillRef}
          theme="bubble"
          style={{
            fontSize: theme.type.base.fontSize,
            fontFamily: theme.type.base.fontFamily,
            color: theme.colors.text,
            lineHeight: 1.618,
            height: '100vh',
            boxSizing: 'border-box',
            padding: '0 5rem',
            width: 'calc(100vw - 36rem)',
            margin: '0 18rem'
          }}
          value={prompt}
          onChange={this.onEditorChange}
          onChangeSelection={this.onEditorChangeSelection}
          onKeyDown={this.onEditorKeyDown}
        />
        <ActivityBar
          groups={activityGroups}
        />
        {/* <button onClick={() => this.speakMessage()}>Speak</button>
        <br />
        <p>{message}</p> */}
      </div>
    )
  }
}

export default DocView
