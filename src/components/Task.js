import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { RIEInput } from 'riek'
import DatePicker from 'react-datepicker'
import CalendarButton from './CalendarButton'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css';

class Task extends Component {

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
        style={{
          listStyleType: 'none',
          textDecoration: status !== "needsAction" ? 'line-through' : 'none',
          fontStyle: syncInProgress ? "italic" : "normal",
          color: syncInProgress ? "grey" : "black"
        }}
        draggable="true"
        onDragStart={e => {
          e.dataTransfer.setData("id", id)
          e.dataTransfer.setData("due", due)
          }
        }
        >
        <span
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: "lightblue"
          }}>:::
          </span>
        <input type="checkbox"
          checked={status === "completed" ? "checked" : ""}
          onChange={this.checked.bind(this)}
        />
        <RIEInput
          value={title}
          change={this.titleChange.bind(this)}
          propName="value" 
        />
        <DatePicker
          dateFormat="YYYY-MM-DD"
          customInput={<CalendarButton />}
          selected={moment(due)}
          onChange={this.dateChange.bind(this)}
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