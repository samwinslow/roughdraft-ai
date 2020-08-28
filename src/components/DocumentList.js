import React from 'react'
import styled from 'styled-components'
import theme from '../constants/theme'
import { SmallPlusIcon, Menu, PlusIcon } from 'evergreen-ui'

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
  font-weight: ${props => props.active || props.primary ? 600 : 400};
`

class DocumentList extends React.Component {
  render () {
    const { documents, onChangeSelectedDocument, selectedDocument } = this.props
    return (
      <Menu>
        <ListItem
          href={`#${document.id}`}
          onSelect={() => onChangeSelectedDocument(document.id)}
          icon={<PlusIcon color={theme.colors.primary} />}
        >
          <ListItemTitle
            primary
            active={(document.id === selectedDocument)}
          >New Document</ListItemTitle>
        </ListItem>
        {documents.map((document, index) => (
          <ListItem
            index={index}
            href={`#${document.id}`}
            onSelect={() => onChangeSelectedDocument(document.id)}
          >
            <ListItemTitle active={(document.id === selectedDocument)}>{document.title}</ListItemTitle>
          </ListItem>
        ))}
      </Menu>
    )
  }
}

export default DocumentList
