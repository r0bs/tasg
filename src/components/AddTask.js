import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment';
import BDatePicker from 'react-bootstrap-date-picker'
import CalendarButton from './CalendarButton'


import 'react-datepicker/dist/react-datepicker.css';

class AddTask extends Component {

    constructor() {
        super()
        this.state = {
            date: new Date().toISOString()
        }
        this.input = "";
    }


    submitTask(e) {
        e.preventDefault()
        if (!this.input.value.trim() || !this.state.date) {
            return
        }
        this.props.submitTask(this.input.value, moment(this.state.date))
        this.input.value = ''
    }


    handleDateChange(date) {
        this.setState({
            date: date
        });
    }


    render() {
        return (
            <div className="addTask">
                <form className="form-inline" onSubmit={(e) => this.submitTask(e)}>
                    <input
                        ref={node => { this.input = node }}
                        className="form-control tasktitleinput"
                        placeholder="Buy Milk"
                    />
                    <BDatePicker
                        customControl={<CalendarButton />}
                        calendarContainer={document.body}
                        value={this.state.date}
                        onChange={(choosendate) => this.handleDateChange(choosendate)}
                    />

                    <button type="submit" className="btn btn-default">
                        <span className="glyphicon glyphicon-plus"></span>
                </button>
                </form>
            </div>

        )
    }

}

AddTask.PropTypes = {
    submitTask: PropTypes.func.isRequired
}

export default AddTask



// <DatePicker
//     className="form-control"
//     dateFormat="YYYY-MM-DD"
//     selected={this.state.date}
//     onChange={(choosendate) => this.handleDateChange(choosendate)}
// />