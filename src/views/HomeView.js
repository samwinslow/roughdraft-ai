import React from 'react'
import '../App.css'
import Api from '../config/Api.js'
import 'react-quill/dist/quill.bubble.css'
import theme from '../constants/theme'

import {
  TabNavigation,
  Tab,
} from 'evergreen-ui'
import styled from 'styled-components'
import BrandTitle from '../components/BrandTitle'

const applicationApi = new Api()

const Header = styled.header`
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
  background-color: ${props => props.primary ? theme.colors.primaryHighlight : 'none'};
`
const HeroSection = styled.section`
  margin: 0;
  padding: 5rem;
  min-height: 15rem;
  background-color: ${props => props.backgroundColor ? theme.colors[props.backgroundColor] : theme.colors.primary};
  color: ${props => props.color ? theme.colors[props.color] : theme.colors.background};
  & h1 {
    font-size: 4rem;
    font-family: ${theme.type.mono.fontFamily};
  }
  & p {
    font-size: 2rem;
    font-weight: 300;
  }
`
const FlexSection = styled.div`
  display: flex;
`
const SubSection = styled.section`
  flex: ${props => props.flex ? props.flex : 1};
  padding: 5rem;
  background-color: ${props => props.backgroundColor ? theme.colors[props.backgroundColor] : theme.colors.primary};
  color: ${props => props.color ? theme.colors[props.color] : theme.colors.background};
  & h1 {
    font-size: 2rem;
    font-family: ${theme.type.mono.fontFamily};
  }
  & p {
    font-size: 1rem;
  }
`

class HomeView extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {

  }

  render() {

    return (
      <div className="HomeView">
        <Header>
          <BrandTitle />
          <Navigation>
            <TabItem is="a" href="#" id={1} isSelected={true}>
              Home
            </TabItem>
            <TabItem is="a" href="#" id={1} isSelected={false}>
              Demo
            </TabItem>
            <TabItem is="a" href="#" id={1} isSelected={false}>
              Pricing
            </TabItem>
            <TabItem is="a" href="doc" id={1} isSelected={false} primary>
              Log In / Sign Up
            </TabItem>
          </Navigation>
        </Header>
        <HeroSection backgroundColor="primary">
          <h1>For illiterate essay writers<br />
          or anyone who needs a little help</h1>
          <p>Roughdraft is an AI writing assistant that learns about your topic &amp; writing style.</p>
        </HeroSection>
        <FlexSection>
          <SubSection backgroundColor="yellow" flex={1}>
            <h1>For illiterate essay writers<br />
            or anyone who needs a little help</h1>
            <p>Roughdraft is an AI writing assistant that learns about your topic &amp; writing style.</p>
          </SubSection>
          <SubSection backgroundColor="lightblue" color="primary" flex={1}>
            <h1>For illiterate essay writers<br />
            or anyone who needs a little help</h1>
            <p>Roughdraft is an AI writing assistant that learns about your topic &amp; writing style.</p>
          </SubSection>
        </FlexSection>
      </div>
    )
  }
}

export default HomeView
