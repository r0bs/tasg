import React, { Component } from 'react';
import Task from "./Task";
import moment from 'moment';

class DateSection extends Component {

  makeMoment(date) {
    return moment(date, moment.ISO_8601).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow (]dddd, MMMM Do YYYY[)]',
        nextWeek: '[Next] dddd, MMMM Do YYYY',
        lastDay: '[Yesterday (]dddd, MMMM Do YYYY[)]',
        lastWeek: '[Last] dddd, MMMM Do YYYY',
        sameElse: 'dddd, MMMM Do YYYY'
    })
  }

  render() {
    return (
        <div
            onDragOver={
                e => {
                    e.preventDefault()
                }
            }
            onDrop={
                e => {
                    e.preventDefault()
                    this.props.taskChange(e.dataTransfer.getData("id"), "due", moment(this.props.date, moment.ISO_8601))
                }
            }>
            <h3 className="Date">{this.props.date == null ? "No Due Date" : this.makeMoment(this.props.date)}</h3>
            <ul>
                {this.props.tasks.map(task =>
                    <Task
                    taskChange={this.props.taskChange}
                    key={task.id}
                    {...task}
                    />
                )}
            </ul>
        </div>
    );
  }

}
export default DateSection;
