import React from 'react'
import styled from 'styled-components'
import theme from '../constants/theme'
import { SmallPlusIcon } from 'evergreen-ui'

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`
const ListItem = styled.li`
  padding: 0 0 1rem 0;
  font-size: 1rem;
  /* TODO get it to not wrap */
`
const TextLink = styled.a`
  text-decoration: none;
  color: ${props => props.active ? theme.colors.primary : theme.colors.text};
  font-weight: ${props => props.active ? 600 : 400};
  &:hover {
    opacity: 0.5;
  }
`
const PlusGlyph = styled(SmallPlusIcon)`
  position: relative;
  top: 0.1rem;
`
const PlusText = styled.span`
  font-weight: 600;
`

class DocumentList extends React.Component {
  render () {
    const { documents, onChangeSelectedDocument, selectedDocument } = this.props
    return (
      <List>
        <ListItem>
          <TextLink
            href={`#${document.id}`}
            onClick={() => onChangeSelectedDocument(document.id)}
            active={(document.id === selectedDocument)}
          >
            <PlusText>
              <PlusGlyph /> New Document
            </PlusText>
          </TextLink>
        </ListItem>
        {documents.map((document, index) => (
          <ListItem index={index}>
            <TextLink
              href={`#${document.id}`}
              onClick={() => onChangeSelectedDocument(document.id)}
              active={(document.id === selectedDocument)}
            >{document.title}</TextLink>
          </ListItem>
        ))}
      </List>
    )
  }
}

export default DocumentList
