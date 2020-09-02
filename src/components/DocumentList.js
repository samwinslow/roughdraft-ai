import React from 'react'
import styled from 'styled-components'
import theme from '../constants/theme'
import { Menu, PlusIcon } from 'evergreen-ui'

const ListItem = styled(Menu.Item)`
  width: 14rem;
  cursor: pointer;
  border-radius: 0.25rem;
  &:hover {
    background-color: ${theme.colors.accentDarker};
  }
  &:focus {
    background-color: ${theme.colors.accentDarker};
    border: none;
    outline: none;
  }
`
const ListItemTitle = styled.div`
  font-family: ${theme.type.base.fontFamily};
  font-size: 1rem;
  width: 13rem;
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
        <ListItem
          href={`#${document.noteId}`}
          onSelect={() => onChangeSelectedDocument('new')}
          icon={<PlusIcon color={theme.colors.primary} />}
        >
          <ListItemTitle
            primary
            active={(selectedDocument === 'new')}
          >New Document</ListItemTitle>
        </ListItem>
        {documents.map((document) => (
          <ListItem
            key={document.noteId}
            href={`#${document.noteId}`}
            onSelect={() => onChangeSelectedDocument(document.noteId)}
          >
            <ListItemTitle active={(document.noteId === selectedDocument)}>{document.title}</ListItemTitle>
          </ListItem>
        ))}
      </Menu>
    )
  }
}

export default DocumentList
