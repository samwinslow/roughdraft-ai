import { readBuilderProgram } from "typescript";

const theme = {
  colors: {
    red: '#FF5C00',
    yellow: '#FFB800',
    lightblue: '#CEF0F2',
    violet: '#7000FF',
    pink: '#FF99D6',
    text: '#1C0040',
    primary: '#7000FF',
    primaryHighlight: 'rgba(112, 0, 255, 0.15)',
    background: '#FFF',
    accent: '#F5FAFA',
    accentDarker: '#D8F0F0',
    highlight: 'rgba(255, 92, 0, 0.15)',
  },
  type: {
    base: {
      fontSize: '1rem',
      fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    },
    mono: {
      fontSize: '1rem',
      fontFamily: "'IBM Plex Mono', Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace"
    }
  }
}

export default theme;
