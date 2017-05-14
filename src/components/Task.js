import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { RIEInput } from 'riek'

class Task extends Component {

  change(newTitle) {
    this.props.taskChange(this.props.id, "title", newTitle.value)
  }

  render() {

    const {status, syncInProgress, title} = this.props;

    return(
      <li
        style={{
          textDecoration: status !== "needsAction" ? 'line-through' : 'none',
          fontStyle: syncInProgress ? "italic" : "normal",
          color: syncInProgress ? "grey" : "black"
        }}
      >
        <RIEInput
          value={title}
          change={this.change.bind(this)}
          propName="value" 
          />
      </li>
    )
  }
}

Task.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Task
