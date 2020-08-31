import React from 'react'
import '../App.css'
import Api from '../config/Api.js'
import 'react-quill/dist/quill.bubble.css'
import theme from '../constants/theme'
import chroma from 'chroma-js'
import {
  Button,
} from 'evergreen-ui'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WomanIllustration from '../assets/rd-woman-hci.svg'

const applicationApi = new Api()

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
    max-width: 28rem;
    margin: 1rem auto;
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
const StyledButton = styled(Button)`
  font-family: ${theme.type.base.fontFamily};
  color: ${props => props.color ? props.color : theme.colors.primary};
  background-color: ${props => props.background ? chroma(props.color ? props.color : theme.colors.primary).alpha(0.15) : 'transparent'};
  &:hover {
    background-color: ${props => chroma(props.color ? props.color : theme.colors.primary).alpha(0.15)} !important;
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
        <Header />
        <HeroSection backgroundColor={theme.colors.primary}>
          <h1>For illiterate essay writers... or anyone who needs a little help</h1>
          <p>Roughdraft is an AI writing assistant that learns about your topic &amp; writing style.</p>
        </HeroSection>
        <FlexSection>
          <SubSection backgroundColor={theme.colors.background} color={theme.colors.text} style={{ textAlign: 'center' }} flex={1}>
            <img src={WomanIllustration} style={{ width: '75%', margin: '2rem auto', display: 'block' }}/>
            <h1><WavyText>Writers’ block</WavyText>, meet AI</h1>
            <p>Even the best writers get stuck. When you can’t think of how to start your next sentence, try using a super-smart AI that suggests what to say.</p>
            <p>Sound complicated? Roughdraft makes it easy.</p>
            <StyledButton height={48} appearance="minimal" color={theme.colors.primary}>Get Started</StyledButton>
          </SubSection>
          <SubSection backgroundColor={theme.colors.lightblue} color={theme.colors.text} flex={1}>
            <h1>Get started in 3 steps</h1>
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
              <StyledButton height={32} appearance="minimal" color={theme.colors.background} background>Get Started</StyledButton>
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
              <StyledButton height={32} appearance="minimal" color={theme.colors.background} background>Get Started</StyledButton>
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
              <StyledButton height={32} appearance="minimal" color={theme.colors.background} background>Get Started</StyledButton>
            </PriceBox>
          </PriceSection>
        </FlexSection>
        <Footer />
      </div>
    )
  }
}

export default HomeView
