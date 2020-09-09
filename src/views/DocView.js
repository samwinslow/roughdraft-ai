import React from 'react'
import '../App.css'
import Api from '../config/Api.js'
import debounce from 'lodash/debounce'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import theme from '../constants/theme'
import Sidebar from '../components/Sidebar'
import ActivityBar from '../components/ActivityBar'
import styled from 'styled-components'
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
  toaster,
  Spinner
} from 'evergreen-ui'
import {
  Link
} from 'react-router-dom'

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
    documents: [],
    message: '',
    prompt: initialPromptState,
    selectedSource: 'Personal Style',
    maxCharacters: 140,
    seed: getSeed(),
    selectedDocument: '',
    editorState: 'start', // enum 'start', 'editor', 'loading'
    documentTitle: 'New Document'
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

  getDocuments = async () => {
    try {
      let documents = await applicationApi.getDocuments()
      return documents
    } catch (err) {
      toaster.danger('Error getting doc', {
        id: 'model-status'
      })
      return false
    }
  }

  updateDocument = async (noteId, title, content) => {
    try {
      let result = await applicationApi.updateDocument(noteId, title, content)
      return result
    } catch (err) {
      toaster.danger('Error updating doc', {
        id: 'model-status'
      })
      return { status: false }
    }
  }

  onChangeSelectedDocument = async (noteId) => {
    const { editor } = this.quillRef.current
    try {
      editor.blur()
      this.setState({
        editorState: 'loading'
      })
      let result = await applicationApi.getDocument(noteId)
      if (result) {
        this.setState({
          selectedDocument: noteId,
          prompt: result.content,
          editorState: 'editor'
        })
      } else {
        throw new Error('Error getting doc')
      }
    } catch (err) {
      toaster.danger('Error getting doc', {
        id: 'model-status'
      })
      this.setState({
        selectedDocument: '',
        editorState: 'start'
      })
    }
  }

  onEditorChange = (content, delta, source, editor) => {
    this.setState({
      prompt: content
    })
    const { selectedDocument } = this.state
    if (content === '<p><br></p>') {
      content = initialPromptState
    }
    let title = this.state.documentTitle
    let titleMatch = content.match(/^(<h1>.*<\/h1>)/)
    if(titleMatch) {
      title = editor.getText().split('\n')[0]
      if (!title.replace(/\s/g,'').length) title = 'New Document'
      this.setDocumentTitle(title.substring(0, 140))
    }
    this.setRemoteContent(selectedDocument, title, content)
    if (delta.ops[delta.ops.length - 1].insert === '/') {
      //TODO switch to special insert mode
    }
  }

  createNewDocument = async () => {
    const { editor } = this.quillRef.current
    try {
      editor.blur()
      this.setState({
        editorState: 'loading'
      })
      let newDoc = await applicationApi.createDocument(null, initialPromptState)
      if (newDoc) {
        this.setState({
          documents: [...this.state.documents, newDoc]
        })
        await this.onChangeSelectedDocument(newDoc.noteId)
        editor.focus()
      }
    } catch (err) {
      toaster.danger('Error creating doc', {
        id: 'model-status'
      })
      console.log(err)
    } finally {
      this.setState({
        editorState: 'editor'
      })
    }
  }

  deleteDocument = async (noteId) => {
    try {
      await applicationApi.deleteDocument(noteId)
      this.setState({
        documents: this.state.documents.filter(d => d.noteId !== noteId),
        selectedDocument: '',
        editorState: 'start'
      })
    } catch (err) {
      toaster.danger('Error deleting doc', {
        id: 'model-status'
      })
      console.log(err)
    }
  }
  
  setRemoteContent = debounce((noteId, title, content) => {
    this.updateDocument(noteId, title, content)
  }, 500, false)

  setDocumentTitle = (newTitle) => {
    let {
      selectedDocument,
      documents
    } = this.state
    this.setState({
      documentTitle: newTitle,
      documents: documents.map(document => ({
        ...document,
        title: document.noteId === selectedDocument ? newTitle : document.title
      }))
    })
    document.title = newTitle
  }

  componentDidMount = async () => {
    const { editor } = this.quillRef.current
    const { params } = this.props.match
    editor.focus()
    delete editor.keyboard.bindings['9'] // 9: Tab
    console.log(this.props)
    let documents = await this.getDocuments()
    if (documents) this.setState({ documents })
    if (params.noteId && params.noteId !== 'new') await this.onChangeSelectedDocument(params.noteId)
  }
  render() {
    const {
      documents,
      selectedDocument,
      documentTitle,
      prompt,
      selectedSource,
      maxCharacters,
      seed,
      editorState
    } = this.state
    const {
      user,
      match
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
          {
            title: 'print auth TEMP',
            component: (
              <IconButton
                icon={RefreshIcon}
                height={24}
                style={{ display: 'inline-flex', marginLeft: '0.5rem' }}
                onClick={() => applicationApi.__printAuth()} />
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
          createNewDocument={this.createNewDocument}
          deleteDocument={this.deleteDocument}
          onChangeSelectedDocument={this.onChangeSelectedDocument}
        />
        { (editorState === 'loading') && (
          <PlaceholderQuill>
            <Spinner marginX="auto" marginY={120} />
          </PlaceholderQuill>
        )}
        { (editorState === 'start') && (
          <PlaceholderQuill>
            <h1>Welcome! Let’s get drafting.</h1>
            <ul>
              <li>Click <a href="#" onClick={this.createNewDocument}>New Document</a> or select one of your existing docs</li>
              <li>Press <code>Tab</code> to autocomplete using the AI assistant.</li>
            </ul>
            <p>Assistant Settings</p>
            <ul>
              <li><b>Source</b>: You’ll need to be on a paid plan to use a custom model.</li>
              <li><b>Max Characters</b>: How many characters should the AI fill in each time?</li>
              <li><b>Seed</b>: Shuffle to add randomness. Useful if the AI is repeating itself.</li>
            </ul>
          </PlaceholderQuill>
        )}
        <ReactQuill
          ref={this.quillRef}
          theme="bubble"
          style={{
            ...centerColumnStyle,
            display: editorState === 'editor' ? 'block' : 'none'
          }}
          value={prompt}
          onChange={this.onEditorChange}
          onChangeSelection={this.onEditorChangeSelection}
          onKeyDown={this.onEditorKeyDown}
          readOnly={editorState !== 'editor'}
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

const centerColumnStyle = {
  fontSize: theme.type.base.fontSize,
  fontFamily: theme.type.base.fontFamily,
  color: theme.colors.text,
  lineHeight: 1.618,
  height: '100vh',
  boxSizing: 'border-box',
  padding: '0 5rem',
  width: 'calc(100vw - 36rem)',
  margin: '0 18rem',
}
const PlaceholderQuill = styled.div`
  font-size: ${theme.type.base.fontSize};
  font-family: ${theme.type.base.fontFamily};
  color: ${theme.colors.text};
  line-height: 1.618;
  box-sizing: border-box;
  padding: 5rem;
  width: calc(100vw - 36rem);
  margin: 0 18rem;
  h1 {
    font-family: ${theme.type.mono.fontFamily};
  }
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    &:link {
      color: ${theme.colors.primary};
    }
    &:hover {
      color: ${theme.colors.primary};
      text-decoration: underline;
    }
    &:active {
      color: ${theme.colors.primary};
    }
    &:visited {
      color: ${theme.colors.primary};
    }
  }
  code {
    font-size: 0.9rem;
    padding: 0.05rem 0.15rem;
    border: 1px solid ${theme.colors.accentDarker};
    border-radius: 0.25rem;
    font-family: ${theme.type.mono.fontFamily};
    font-weight: 500;
    background-color: ${theme.colors.accent};
  }
`

export default DocView
