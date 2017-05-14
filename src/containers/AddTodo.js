import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import DatePicker from 'react-datepicker'
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


class AddTodo extends Component{

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      date: moment()
    }
    this.input = "";
  }

  submitTask(e) {
    e.preventDefault()
    if (!this.input.value.trim() || !this.state.date) {
      return
    }
    this.dispatch(addTodo(this.input.value, this.state.date))
    this.input.value = ''
  }


  handleDateChange(date) {
    this.setState({
      date: date
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.submitTask(e)}>
          <input ref={node => {
            this.input = node
          }} />
          <DatePicker
            dateFormat="YYYY-MM-DD"
            selected={this.state.date}
            onChange={(choosendate) => this.handleDateChange(choosendate)} 
            />
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    )
  }
}

AddTodo = connect()(AddTodo)

export default AddTodo
