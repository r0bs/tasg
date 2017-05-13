import React, { Component } from 'react';
import Todo from "./Todo";
import moment from 'moment';

class DateSection extends Component {

  makeMoment(date) {
    const day = moment(date, moment.ISO_8601);
    return day.format("dddd, MMMM Do YYYY");
  }

  render() {
    return (
        <div>
            <h3 className="Date">{this.props.date == null ? "no due date" : this.makeMoment(this.props.date)}</h3>
            <ul>
                {this.props.tasks.map(todo =>
                    <Todo
                    key={todo.id}
                    {...todo}
                    />
                )}
            </ul>
        </div>
    );
  }

}
export default DateSection;
