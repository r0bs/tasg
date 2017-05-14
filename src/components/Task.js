import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { RIEInput } from 'riek'

class Task extends Component {

  change(newTitle) {
    this.props.taskTitleChange(this.props.id, newTitle.value)
  }

  render() {

    const {status, syncInProgress, title} = this.props;

    return(
      <li
        style={{
          textDecoration: status !== "needsAction" ? 'line-through' : 'none',
          backgroundColor: syncInProgress ? "lightblue" : "transparent"
        }}
      >
        <RIEInput
          value={title}
          change={this.change.bind(this)}
          propName="value" 
          // className={this.state.highlight ? "editable" : ""}
          // validate={this.isStringAcceptable}
          // classLoading="loading"
          // classInvalid="invalid"
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
