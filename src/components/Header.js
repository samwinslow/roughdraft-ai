import React from 'react'
import styled from 'styled-components'
import BrandTitle from './BrandTitle'
import {
  TabNavigation,
  Tab,
} from 'evergreen-ui'
import theme from '../constants/theme'
import Amplify, { Auth } from 'aws-amplify'

const StyledHeader = styled.header`
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 1rem;
  background-color: ${theme.colors.accent};
`
const Navigation = styled(TabNavigation)`
  padding: 0.5rem;
`
const TabItem = styled(Tab)`
  font-family: ${theme.type.base.fontFamily};
  font-size: ${theme.type.base.fontSize};
  color: ${props => props.primary ? theme.colors.primary : theme.colors.text};
`

class Header extends React.Component {
  render() {
    return (
      <StyledHeader>
        <BrandTitle />
        <Navigation>
          <TabItem is="a" href="/" id={1} isSelected={true}>
            Home
          </TabItem>
          <TabItem is="a" href="#" id={1} isSelected={false}>
            Demo
          </TabItem>
          <TabItem is="a" href="#" id={1} isSelected={false}>
            Pricing
          </TabItem>
          <TabItem is="a" href="#" id={1} isSelected={false} primary onClick={() => Auth.federatedSignIn()}>
            Log In / Sign Up
          </TabItem>
        </Navigation>
      </StyledHeader>
    )
  }
}

export default Header;
