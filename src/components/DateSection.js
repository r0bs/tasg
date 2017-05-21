import React, { Component } from 'react';
import Task from "./Task";
import moment from 'moment';
import DropableDiv from "./DropableDiv"

class DateSection extends Component {

    constructor() {
        super();
        this.dropzone = 0;
    }

  makeMoment(date) {
    return moment(date, moment.ISO_8601).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'MMMM YYYY, [Next] dddd',
        lastDay: '[Yesterday]',
        lastWeek: 'MMMM YYYY, [Last] dddd',
        sameElse: 'MMMM YYYY, dddd'
    })
  }

  onDrop(e) {
    if(e.dataTransfer.getData("due") !== this.props.date) {
        this.props.taskChange(
            e.dataTransfer.getData("id"), 
            "due", 
            moment(this.props.date, moment.ISO_8601)
        )
    }
  }

  render() {
    return (
        <DropableDiv onDrop={this.onDrop.bind(this)} >
            <div className="row datearea">
                <div className="day">
                    {this.props.date == null ? "0" : moment(this.props.date, moment.ISO_8601).format("D")}
                </div>
                <div className={
                    moment(this.props.date, moment.ISO_8601).isSame(moment(),"d") ? "date today" : "date"
                }>
                    {this.props.date == null ? "No Due Date" : this.makeMoment(this.props.date)}
                </div>
            </div>
            <ul>
                {this.props.tasks.map(task =>
                    <Task
                    taskChange={this.props.taskChange}
                    key={task.id}
                    {...task}
                    />
                )}
            </ul>
        </DropableDiv>
    );
  }

}
export default DateSection;


//            <h3 className="Date">{this.props.date == null ? "No Due Date" : this.makeMoment(this.props.date)}</h3>
