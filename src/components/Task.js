import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { RIEInput } from 'riek'

class Task extends Component {

  titleChange(newTitle) {
    this.props.taskChange(this.props.id, "title", newTitle.value)
  }

  checked() {
    const newStatus = this.props.status == "needsAction" ? "completed" : "needsAction";

    this.props.taskChange(this.props.id, "status", newStatus)
  }

  render() {

    const {status, syncInProgress, title} = this.props;

    return(
      <li
        style={{
          listStyleType: 'none',
          textDecoration: status !== "needsAction" ? 'line-through' : 'none',
          fontStyle: syncInProgress ? "italic" : "normal",
          color: syncInProgress ? "grey" : "black"
        }}
      >
        <input type="checkbox"
          checked={status === "completed" ? "checked" : ""}
          onChange={this.checked.bind(this)}
        />
        <RIEInput
          value={title}
          change={this.titleChange.bind(this)}
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
