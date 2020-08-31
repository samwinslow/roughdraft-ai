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
import WomanIllustration from '../assets/rd-woman-hci.svg'
import Footer from '../components/Footer'

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

class PrivacyPageView extends React.Component {
  componentDidMount() {
    document.title = 'Privacy | Roughdraft'
  }
  render() {
    return (
      <div className="PrivacyPageView">
        <Header />
        <HeroSection backgroundColor={theme.colors.primary}>
          <h1><WavyText decorationColor={theme.colors.yellow}>Privacy Policy</WavyText></h1>
          <p>Updated August, 2020</p>
        </HeroSection>
        <FlexSection>
          <SubSection backgroundColor={theme.colors.background} color={theme.colors.text} flex={1}>
            <p>Samuel Winslow and contractors doing business as "Roughdraft" ("us", "we", or "our") operates the <a href="https://roughdraft.ai/">https://roughdraft.ai/</a> website and the Roughdraft mobile application (hereinafter referred to as the "Service").</p><p>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p><p>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.</p><h3><strong>INFORMATION COLLECTION AND USE</strong></h3><p>We collect several different types of information for various purposes to provide and improve our Service to you.</p><h3><strong>Types of Data Collected</strong></h3><h3><strong>Personal Data</strong></h3><p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p><ul role="list"><li>First name and last name</li><li>Email address</li><li>Profile photo</li><li>Phone number</li><li>Cookies and Usage Data</li></ul><h3><strong>Usage Data</strong></h3><p>We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Usage Data").</p><p>This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p><p>When you access the Service with a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.</p><h3><strong>Tracking &amp; Cookies Data</strong></h3><p>We use cookies and similar tracking identifiers to track the activity on our Service and hold certain information.</p><p>Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.</p><p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service. You can learn more how to manage cookies in the <a href="https://privacypolicies.com/blog/how-to-delete-cookies/">Browser Cookies Guide</a>.</p><p>Examples of tracking identifiers we use:</p><ul role="list"><li>Apple Identifier for Advertisers (IDFA)</li><li>Session Cookies: We use Session Cookies to operate our Service.</li><li>Preference Cookies: We use Preference Cookies to remember your preferences and various settings.</li><li>Security Cookies: We use Security Cookies for security purposes.</li></ul><h3><strong>USE OF DATA</strong></h3><p>Roughdraft uses the collected data for various purposes:</p><ul role="list"><li>To provide and maintain the Service</li><li>To notify you about changes to our Service</li><li>To allow you to participate in interactive features of our Service when you choose to do so</li><li>To provide customer care and support</li><li>To provide analysis or valuable information so that we can improve the Service</li><li>To monitor the usage of the Service</li><li>To detect, prevent and address technical issues</li></ul><h3><strong>TRANSFER OF DATA</strong></h3><p>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</p><p>If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.</p><p>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p><p>Roughdraft will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p><h3><strong>DISCLOSURE OF DATA</strong></h3><h3><strong>Legal Requirements</strong></h3><p>Roughdraft may disclose your Personal Data in the good faith belief that such action is necessary to:</p><ul role="list"><li>To comply with a legal obligation</li><li>To protect and defend the rights or property of Roughdraft</li><li>To prevent or investigate possible wrongdoing in connection with the Service</li><li>To protect the personal safety of users of the Service or the public</li><li>To protect against legal liability</li></ul><h3><strong>SECURITY OF DATA</strong></h3><p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p><h3><strong>SERVICE PROVIDERS</strong></h3><p>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</p><p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p><h3><strong>LINKS TO OTHER SITES</strong></h3><p>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p><p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p><h3><strong>CHILDREN'S PRIVACY</strong></h3><p>Our Service does not address anyone under the age of 18 ("Children").</p><p>We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p><h3><strong>CHANGES TO THIS PRIVACY POLICY</strong></h3><p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p><p>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.</p><p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p><h3><strong>CONTACT US</strong></h3><p>If you have any questions about this Privacy Policy, please contact us by email at: <a href="mailto:sam@roughdraft.ai">sam@roughdraft.ai</a></p><p>‍</p>
          </SubSection>
        </FlexSection>
        <Footer />
      </div>
    )
  }
}

export default PrivacyPageView