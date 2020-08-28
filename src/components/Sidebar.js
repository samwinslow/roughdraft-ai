import React from 'react'
import theme from '../constants/theme'
import styled from 'styled-components'
import BrandTitle from './BrandTitle'
import DocumentList from './DocumentList'

const Container = styled.div`
  font-size: ${theme.type.base.fontSize};
  color: ${theme.colors.text};
  background-color: ${theme.colors.accent};
  padding: 5rem 2rem;
  min-width: 16rem;
  height: 100vh;
  box-sizing: border-box;
`
const Section = styled.section`
  position: fixed;
  max-width: 12rem;
`

class Sidebar extends React.Component {
  render () {
    const { documents, onChangeSelectedDocument, selectedDocument } = this.props
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
      </Container>
    )
  }
}


export default Sidebar;
