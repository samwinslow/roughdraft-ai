import React from 'react'
import { Button, RecordIcon, RefreshIcon, StopIcon, CellTowerIcon } from 'evergreen-ui'
import Spinner from 'evergreen-ui/commonjs/spinner/src/Spinner'

class RecognitionButton extends React.Component {
  state = {
    hover: false
  }
  render() {
    const { status, onClick } = this.props
    const { hover } = this.state
    switch (status) {
      case 'disabled':
        return (
          <Button
            onClick={onClick}
            intent="success"
            appearance="primary"
            height={24}
            iconBefore={CellTowerIcon}
          >Start</Button>
        )
      case 'pending':
        return (
          <Button
            onClick={onClick}
            intent="warning"
            appearance="primary"
            height={24}
            iconBefore={RefreshIcon}
          >Loading</Button>
        )
      case 'enabled':
        return (
          <Button
            onClick={onClick}
            intent="danger"
            appearance="primary"
            height={24}
            iconBefore={hover? StopIcon : RecordIcon}
            onMouseEnter={() => this.setState({ hover: true })}
            onMouseLeave={() => this.setState({ hover: false })}
          >{hover? 'Stop' : 'Listening'}</Button>
        )
      case 'error':
        return (
          <Button
            onClick={onClick}
            disabled
            height={24}
          >Not Available</Button>
        )
      default:
        return (
          <Button
            onClick={onClick}
            intent="success"
            appearance="primary"
            height={24}
            iconBefore={CellTowerIcon}
          >Start</Button>
        )
    }
  }
}

export default RecognitionButton
