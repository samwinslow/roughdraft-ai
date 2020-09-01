import React from 'react'
import theme from '../constants/theme'
import styled from 'styled-components'
import BrandTitle from './BrandTitle'
import DocumentList from './DocumentList'

const Container = styled.div`
  font-size: ${theme.type.base.fontSize};
  color: ${theme.colors.text};
  background-color: ${theme.colors.accent};
  padding: 5rem 1rem;
  width: 18rem;
  height: 100vh;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
`
const Section = styled.section`
  position: fixed;
  max-width: 12rem;
`

class Sidebar extends React.Component {
  render () {
    const { user, documents, onChangeSelectedDocument, selectedDocument } = this.props
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
          {/* TODO make signout component here */}
          {user.attributes.email}
        </Section>
      </Container>
    )
  }
}


export default Sidebar;
