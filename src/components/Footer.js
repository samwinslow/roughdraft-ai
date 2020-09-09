import React from 'react'
import styled from 'styled-components'
import BrandTitle from './BrandTitle'
import {
  TabNavigation,
  Tab,
} from 'evergreen-ui'
import theme from '../constants/theme'

const StyledFooter = styled.footer`
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 1rem;
  background-color: ${theme.colors.accent};
  font-size: 0.618rem;
  color: ${theme.colors.text};
`
const Navigation = styled(TabNavigation)`
  padding: 0.5rem;
`
const TabItem = styled(Tab)`
  font-weight: 400;
  font-family: ${theme.type.base.fontFamily};
  font-size: 0.618rem;
  color: ${theme.colors.text};
`

class Footer extends React.Component {
  render() {
    return (
      <StyledFooter>
        <p>&copy; 2020 Samuel Winslow d/b/a Roughdraft</p>
        <Navigation>
          <TabItem is="a" href="/" id={1} isSelected={true}>
            Home
          </TabItem>
          <TabItem is="a" href="/privacy" id={1} isSelected={false}>
            Privacy Policy
          </TabItem>
          <TabItem is="a" href="/terms" id={1} isSelected={false}>
            Terms of Service
          </TabItem>
          <TabItem is="a" href="https://samwinslow.typeform.com/to/xBMZ0XKz" id={1} isSelected={false}>
            Request Access
          </TabItem>
        </Navigation>
      </StyledFooter>
    )
  }
}

export default Footer;
