import React from 'react'
import styled from 'styled-components'
import theme from '../constants/theme'
import {
  Menu,
  PlusIcon,
  IconButton,
  TrashIcon
} from 'evergreen-ui'

const ListItem = styled(Menu.Item)`
  width: 100%;
  cursor: pointer;
  border-radius: 0.25rem;
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
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.primary ? theme.colors.primary : theme.colors.text};
  font-weight: ${props => props.active ? 600 : 400};
`

class DocumentList extends React.Component {
  render () {
    const { documents, onChangeSelectedDocument, selectedDocument } = this.props
    return (
      <Menu>
        <div style={{ width: '16rem'}}>
          <ListItem
            href={`#${document.noteId}`}
            onSelect={() => onChangeSelectedDocument('new')}
            icon={<PlusIcon color={theme.colors.primary} />}
          >
            <ListItemTitle
              primary
            >New Document</ListItemTitle>
          </ListItem>
          {documents.map((document) => (
            <ListItem
              key={document.noteId}
              href={`#${document.noteId}`}
              onSelect={() => onChangeSelectedDocument(document.noteId)}
            >
              <ListItemTitle active={(document.noteId === selectedDocument)}>{document.title || 'Untitled Document'}</ListItemTitle>
              <IconButton
                className="trashButton"
                appearance="minimal"
                icon={TrashIcon}
                height={20}
                onClick={() => console.log('ayo')} />
            </ListItem>
          ))}
        </div>
      </Menu>
    )
  }
}

export default DocumentList
