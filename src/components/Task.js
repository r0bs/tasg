import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { RIEInput } from 'riek'

class Task extends Component {

  componentDidMount() {
    // check if element is newly created
    if(this.props.syncInProgress) {
      // only then scroll it into view
        this.li.scrollIntoViewIfNeeded()
    }
  }

  titleChange(newTitle) {
    this.props.taskChange(this.props.id, "title", newTitle.value)
  }

  checked() {
    const newStatus = this.props.status === "needsAction" ? "completed" : "needsAction";

    this.props.taskChange(this.props.id, "status", newStatus)
  }

  dateChange(date) {
    this.props.taskChange(this.props.id, "due", date)
  }

  render() {

    const {status, syncInProgress, title, due, id} = this.props;

    return(
      <li
        ref={node => this.li = node } 
        style={{
          listStyleType: 'none',
        }}
        className={
          status !== "needsAction" ? "task completed": "task todo"
        }
        draggable="true"
        onDragStart={e => {
          e.dataTransfer.setData("id", id)
          e.dataTransfer.setData("due", due)
          }
        }
        >
        <input type="checkbox"
          checked={status === "completed" ? "checked" : ""}
          onChange={this.checked.bind(this)}
          style={{
            margin: "3px",
            marginRight: "7px"
          }}
        />
        <span 
          style={{
            fontStyle: syncInProgress ? "italic" : "normal",
            color: status !== "needsAction"  ? "grey" : "black"
          }}>  
            <RIEInput
              value={title}
              change={this.titleChange.bind(this)}
              propName="value"
            />
        </span>
        
      </li>
    )
  }
}

Task.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Task