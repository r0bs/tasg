import React, {Component} from 'react'
import PropTypes from 'prop-types'
import DateSection from './DateSection'

class TodoList extends Component{

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
        .map((duedate, index)=>{
          return <DateSection 
                  key={index} 
                  date={duedate} 
                  tasks={tasks.filter(task => task.due === duedate)}
                  />;
        })

  }

  render() {
    return(
      <ul>
      {this.sortTasksByDate(this.props.tasks)}
    </ul>
    )
  }

}

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    syncInProgress: PropTypes.bool.isOptional
  }).isRequired).isRequired
}

export default TodoList
