import React from 'react'
import theme from '../constants/theme'
import BrandTitle from './BrandTitle'

class Sidebar extends React.Component {
  render () {
    const { documents } = this.props
    return (
      <div style={styles.container}>
        <section style={styles.section}>
          <BrandTitle />
          { documents && (
            <ul style={styles.documentList}>
              {documents.map((document, index) => (
                <li
                  index={index}
                  style={styles.documentListItem}
                >
                  <a
                    href={`#${document.id}`}
                    style={styles.documentLink}
                  >{document.title}</a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    )
  }
}

const styles = {
  container: {
    fontSize: theme.type.base.fontSize,
    color: theme.colors.text,
    backgroundColor: theme.colors.accent,
    padding: '5rem 2rem',
    minWidth: '16rem',
    height: '100vh',
  },
  section: {
    position: 'fixed',
    maxWidth: '12rem'
  },
  documentList: {
    listStyleType: 'none',
    padding: '0'
  },
  documentListItem: {
    padding: '0',
    fontSize: '1rem',
    lineHeight: '2'
  },
  documentLink: {
    textDecoration: 'none',
    color: theme.colors.text
  }
}

export default Sidebar;
