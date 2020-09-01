import React from 'react'
import theme from '../constants/theme'
import styled from 'styled-components'
import ToolList from './ToolList'
import { Menu } from 'evergreen-ui'

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
  right: 0;
`
const Section = styled.section`
  position: fixed;
  max-width: 13rem;
`
const SectionTitle = styled.h2`
  font-size: 0.83rem;
  line-height: 1rem;
  font-weight: 500;
  padding: 0 1rem;
  color: ${theme.colors.text};
  opacity: 0.5;
  text-transform: uppercase;
`
const ActivityItem = styled(Menu.Item)`
  font-family: ${theme.type.base.fontFamily};
  font-size: 1rem;
  width: 13rem;
  color: ${theme.colors.text};
  display: flex;
  justify-items: space-between;
`
const ActivityItemTitle = styled.span`
  font-family: ${theme.type.base.fontFamily};
`
const ActivityItemComponent = styled.span`
  position: absolute;
  right: 0;
`

class ActivityBar extends React.Component {
  render () {
    const { groups } = this.props
    return (
      <Container>
        <Section>
          <Menu>
            { groups.map(group => (
              <Menu.Group>
                <SectionTitle>{group.title}</SectionTitle>
                { group.children.map(item => (
                  <ActivityItem>
                    <ActivityItemTitle>{item.title}</ActivityItemTitle>
                    <ActivityItemComponent>
                      {item.component && (
                        item.component
                      )}
                    </ActivityItemComponent>
                  </ActivityItem>
                ))}
              </Menu.Group>
            ))}
          </Menu>
        </Section>
      </Container>
    )
  }
}


export default ActivityBar;
