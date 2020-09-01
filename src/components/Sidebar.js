import React from 'react'
import theme from '../constants/theme'
import styled from 'styled-components'
import BrandTitle from './BrandTitle'
import DocumentList from './DocumentList'
import {
  Menu,
  Popover,
  Position,
  TextDropdownButton,
  LogOutIcon
} from 'evergreen-ui'
import { Link } from 'react-router-dom'
import Amplify, { Auth } from 'aws-amplify'

const Container = styled.div`
  font-size: ${theme.type.base.fontSize};
  color: ${theme.colors.text};
  background-color: ${theme.colors.accent};
  padding: 5rem 1rem 3rem 1rem;
  width: 18rem;
  height: 100vh;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Section = styled.section`
  max-width: 12rem;
`
const Dropdown = styled(TextDropdownButton)`
  font-family: ${theme.type.base.fontFamily};
  margin-left: 1rem;
`
const ListItem = styled(Menu.Item)`
  width: 14rem;
  cursor: pointer;
  border-radius: 0.25rem;
  &:hover {
    background-color: ${theme.colors.accent};
  }
  &:focus {
    background-color: ${theme.colors.accent};
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
const RouterLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.text};
`

class Sidebar extends React.Component {
  state = {
    selectedSource: ''
  }
  onSourceChange = (selected) => {
    this.setState({
      selectedSource: selected
    })
  }
  
  render () {
    const {
      user,
      documents, 
      onChangeSelectedDocument,
      selectedDocument
    } = this.props
    const { selectedSource } = this.state
    return (
      <Container>
        <Section>
          <BrandTitle />
          { documents && (
            <DocumentList
              documents={documents}
              selectedDocument={selectedDocument}
              onChangeSelectedDocument={onChangeSelectedDocument}
            />
          )}
        </Section>
        <Section>
          <Popover
            position={Position.BOTTOM_LEFT}
            content={
              <Menu>
                <ListItem
                  is={RouterLink}
                  onSelect={() => Auth.signOut()}
                  icon={<LogOutIcon color={theme.colors.red} />}
                >
                  <ListItemTitle>Log Out</ListItemTitle>
                </ListItem>
              </Menu>
            }
          >
            <Dropdown>{user.attributes.email.split('@')[0]}</Dropdown>
          </Popover>
        </Section>
      </Container>
    )
  }
}


export default Sidebar;
