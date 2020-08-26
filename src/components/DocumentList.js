import React from 'react'
import styled from 'styled-components'
import theme from '../constants/theme'

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`
const ListItem = styled.li`
  padding: 0;
  font-size: 1rem;
  line-height: 2;
`
const TextLink = styled.a`
  text-decoration: none;
  color: ${props => props.active ? theme.colors.primary : theme.colors.text};
  font-weight: ${props => props.active ? 600 : 400};
  &:hover {
    opacity: 0.5;
  }
`

class DocumentList extends React.Component {
  render () {
    const { documents } = this.props
    return (
      <List>
        {documents.map((document, index) => (
          <ListItem index={index}>
            <TextLink
              href={`#${document.id}`}
              active={document.active}
            >{document.title}</TextLink>
          </ListItem>
        ))}
      </List>
    )
  }
}

export default DocumentList
