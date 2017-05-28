import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { RIEInput } from 'riek'
import moment from 'moment';
import Flatpickr from 'react-flatpickr'
import TaskCheckBox from './TaskCheckBox'
import 'element.scrollintoviewifneeded-polyfill'

class Task extends Component {

  componentDidMount() {
    if(this.props.syncInProgress) {
        this.li.scrollIntoViewIfNeeded()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props)
  }

  titleChange(newTitle) {
    this.props.taskChange(this.props.id, "title", newTitle.value)
  }

  checked() {
    const newStatus = this.props.status === "needsAction" ? "completed" : "needsAction";

    this.props.taskChange(this.props.id, "status", newStatus)
  }

  dateChange(date) {
    console.log(date)
    this.props.taskChange(this.props.id, "due", date)
  }

  render() {
    const {status, syncInProgress, title, due, id} = this.props;

    return(
      <li
        ref={node => this.li = node } 
        style={{
          listStyleType: 'none',
          animation: syncInProgress ? "highlight 0.5s 1" : ""
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
        <TaskCheckBox status={status} check={this.checked.bind(this)} />
        <span 
          style={{
            color: status !== "needsAction" ? "grey" : "black"
          }}>  
          
            <RIEInput
              value={title}
              change={this.titleChange.bind(this)}
              propName="value"
            />
        </span>
        <div className={
          syncInProgress ? "loader": "hiddenloader loader"
        }/>
        <Flatpickr 
          onChange={(date) => this.dateChange(moment(date.toISOString()))} 
          className="minidatepicker"
          options={{
              defaultDate: this.props.due,
              dateFormat: "d"
          }}
          />      
      </li>
    )
  }
}

Task.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  due: PropTypes.string,
  id: PropTypes.string.isRequired,
  syncInProgress: PropTypes.bool
}

export default Task