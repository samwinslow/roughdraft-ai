import React from 'react'
import styled from 'styled-components'
import theme from '../constants/theme'
import {
  Menu,
  PlusIcon,
  IconButton,
  TrashIcon
} from 'evergreen-ui'
import { Link } from 'react-router-dom'

class DocumentList extends React.Component {
  render () {
    const {
      documents,
      createNewDocument,
      deleteDocument,
      onChangeSelectedDocument,
      selectedDocument
    } = this.props
    return (
      <Menu>
        <div style={{ width: '16rem'}}>
          <ListItem
            role="menuitem"
            to="/doc/new/"
            onClick={() => createNewDocument()}
          >
            <ListItemTitle primary>
              <StyledPlusIcon color={theme.colors.primary} /> New Document
            </ListItemTitle>
          </ListItem>
          {documents.map((document) => (
            <ListItem
              role="menuitem"
              key={document.noteId}
              to={`/doc/${document.noteId}`}
              onClick={() => onChangeSelectedDocument(document.noteId)}
            >
              <ListItemTitle active={(document.noteId === selectedDocument)}>{document.title || 'Untitled Document'}</ListItemTitle>
              <IconButton
                className="trashButton"
                appearance="minimal"
                icon={TrashIcon}
                height={20}
                onClick={() => deleteDocument(document.noteId)} />
            </ListItem>
          ))}
        </div>
      </Menu>
    )
  }
}

const ListItem = styled(Link)`
  display: flex;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem;
  text-decoration: none;
  .trashButton {
    display: none;
  }
  &:hover {
    background-color: ${theme.colors.accentDarker};
    .trashButton {
      display: flex;
    }
  }
  &:focus {
    background-color: ${theme.colors.accentDarker};
    border: none;
    outline: none;
    .trashButton {
      display: flex;
    }
  }
  span {
    width: 100% !important;
    display: flex;
    justify-content: space-between;
  }
`
const ListItemTitle = styled.div`
  font-family: ${theme.type.base.fontFamily};
  font-size: 1rem;
  line-height: 20px;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.primary ? theme.colors.primary : theme.colors.text};
  font-weight: ${props => props.active ? 600 : 400};
`
const StyledPlusIcon = styled(PlusIcon)`
  position: relative;
  top: 2px;
`

export default DocumentList
