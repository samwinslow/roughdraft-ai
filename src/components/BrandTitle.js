import React from 'react'
import theme from '../constants/theme'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

class BrandTitle extends React.Component {
  render () {
    return (
      <H1>
        <Link to={this.props.href ? this.props.href : '/'}>roughdraft</Link>
      </H1>
    )
  }
}

const H1 = styled.h1`
  font-size: 1.618rem;
  font-family: ${theme.type.mono.fontFamily};
  font-weight: 600;
  line-height: 1;
  color: ${theme.colors.text};
  margin: 1rem 0.5rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  a {
    color: inherit !important;
    text-decoration: none !important;
    &:hover {
      opacity: 0.618;
    }
  }
`

export default BrandTitle;
