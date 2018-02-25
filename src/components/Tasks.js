import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DateSection from './DateSection'

class TaskList extends Component {

  getTaskDate(val) {
    return val.due
  }

  distinctDate(newdatelist, duedate) {
    return newdatelist.includes(duedate) ? newdatelist : [...newdatelist, duedate];
  }


  sortTasksByDate(tasks) {

    return tasks
      .map(this.getTaskDate)
      .reduce(this.distinctDate, [])
      .sort()
      .map((duedate, index) => {
        return <DateSection
          taskChange={this.props.taskChange}
          key={index}
          date={duedate}
          tasks={tasks.filter(task => task.due === duedate)}
        />;
      })

  }

  render() {
    let taskcountinfo = ""

    if(!this.props.tasks.length && !this.props.isFetching && !this.props.searchterm.length) {
      taskcountinfo = <h5>There are no tasks to display! Create one by using the inputs above.</h5>
    } else if (!this.props.tasks.length && !this.props.isFetching && this.props.searchterm.length) {
      taskcountinfo = <h5>There are no tasks to display for your search!</h5>
    }

    return (
      <div className="tasklist">
        <ul>
          {taskcountinfo}
          {this.sortTasksByDate(this.props.tasks)}
        </ul>
      </div>
    )
  }

}

TaskList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  searchterm: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    due: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    syncInProgress: PropTypes.bool.isOptional
  }).isRequired).isRequired
}

export default TaskList
