import React from 'react'
import '../App.css'
import Api from '../config/Api.js'
import 'react-quill/dist/quill.bubble.css'
import theme from '../constants/theme'
import chroma from 'chroma-js'
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
  background-color: ${props => props.backgroundColor ? props.backgroundColor : theme.colors.primary};
  color: ${props => props.color ? props.color : theme.colors.background};
  font-size: 2rem;
  h1 {
    font-size: 4rem;
    font-family: ${theme.type.mono.fontFamily};
  }
  p {
    font-weight: 300;
  }
`
const FlexSection = styled.div`
  display: flex;
`
const SubSection = styled.section`
  flex: ${props => props.flex ? props.flex : 1};
  padding: 5rem;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : theme.colors.primary};
  color: ${props => props.color ? props.color : theme.colors.background};
  h1 {
    font-size: 2rem;
    font-family: ${theme.type.mono.fontFamily};
  }
  h2 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0.618rem 0;
  }
  ul, ol {
    padding: 0;
    list-style: none;
    li {
      margin: 1rem 0;
      max-width: 28rem;
    }
  }
  ol {
    counter-reset: ol-counter;
  }
  ol li {
    counter-increment: ol-counter;
    &::before {
      content: counter(ol-counter);
      font-weight: 300;
      font-size: 2rem;
      display: inline;
      color: ${theme.colors.red};
    }
  }
  p {
    font-size: 1rem;
  }
`
const PriceSection = styled(SubSection)`
  ul {
    min-height: 12rem;
  }
`
const PriceBox = styled.div `
  h2 {
    margin: 0;
    font-size: 1.618rem;
    font-weight: 400;
  }
  h3 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0.5rem 0;
  }
`
const WavyText = styled.strong`
  font-weight: inherit;
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-underline-position: under;
  text-decoration-color: ${props => props.decorationColor ? props.decorationColor : theme.colors.red};
  -webkit-text-decoration-color: ${theme.colors.red};
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
        <HeroSection backgroundColor={theme.colors.primary}>
          <h1>For illiterate essay writers... or anyone who needs a little help</h1>
          <p><WavyText>Roughdraft</WavyText> is an AI writing assistant that learns about your topic &amp; writing style.</p>
        </HeroSection>
        <FlexSection>
          <SubSection backgroundColor={theme.colors.lightblue} color={theme.colors.text} flex={1}>
            <h1>How it works</h1>
            <ol>
              <li>
                <h2>Try it out</h2>
                Try using the free Roughdraft Editor with an AI model trained on a set of essays on philosophy and social sciences.
              </li>
              <li>
                <h2>Get a custom-trained model</h2>
                To personalize the Editor’s suggestions to your writing style and subject matter, upload lots of writing samples and assigned readings for your course.
              </li>
              <li>
                <h2>Write creatively with AI</h2>
                Use your custom-trained AI model to help you when you get stuck!
              </li>
            </ol>
          </SubSection>
          <SubSection backgroundColor={theme.colors.background} color={theme.colors.text} flex={1}>
            <h1>Pricing</h1>
            <p>An AI service is costly to maintain! We offer flexible pricing and you can always request your money back if you’re not satisfied with the results of your custom-trained model.</p>
            <ol>
              <li>
                <h2>Free</h2>
                Write with an AI model pre-trained on philosophy and social sciences. There is a 500-word limit per document.
              </li>
              <li>
                <h2>Basic</h2>
                Get a custom-trained model based on the writing samples and assigned readings you provide. There is a 5,000-word limit per document.
              </li>
              <li>
                <h2>Unlimited</h2>
                Everything in Basic, plus personalized tutoring and suggested sources for further reading. There is no word limit!
              </li>
            </ol>
          </SubSection>
        </FlexSection>
        <FlexSection>
          <PriceSection backgroundColor={theme.colors.red} flex={1}>
            <h1><WavyText decorationColor={theme.colors.yellow}>Unlimited</WavyText></h1>
            <ul>
              <li>Get access to personalized tutoring and suggested sources for further reading.</li>
              <li>Get a custom-trained model based on the writing samples and assigned readings you provide.</li>
              <li>Write with an AI model pre-trained on philosophy and social sciences, or use a custom model.</li>
              <li>No word limit!</li>
            </ul>
            <PriceBox>
              <h2>$25/month</h2>
              <h3>For 3 months, or $33/month</h3>
            </PriceBox>
          </PriceSection>
          <PriceSection backgroundColor={chroma(theme.colors.red).brighten(0.5)} flex={1}>
            <h1><WavyText decorationColor={theme.colors.yellow}>Basic</WavyText></h1>
            <ul>
              <li>Get a custom-trained model based on the writing samples and assigned readings you provide.</li>
              <li>Write with an AI model pre-trained on philosophy and social sciences, or use a custom model.</li>
              <li>2,000-word limit per document</li>
            </ul>
            <PriceBox>
              <h2>$20/month</h2>
              <h3>Cancel at any time</h3>
            </PriceBox>
          </PriceSection>
          <PriceSection backgroundColor={chroma(theme.colors.red).brighten(1)} flex={1}>
            <h1>Free</h1>
            <ul>
              <li>Write with an AI model pre-trained on philosophy and social sciences.</li>
              <li>500-word limit per document</li>
            </ul>
            <PriceBox>
              <h2>$0</h2>
              <h3>Free as in beer</h3>
            </PriceBox>
          </PriceSection>
        </FlexSection>
      </div>
    )
  }
}

export default HomeView
