import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class AddTask extends Component {

    constructor() {
        super()
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
        this.props.submitTask(this.input.value, this.state.date)
        this.input.value = ''
    }


    handleDateChange(date) {
        this.setState({
            date: date
        });
    }


    render() {
        return (
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
        )
    }

}

AddTask.PropTypes = {
  submitTask: PropTypes.func.isRequired
}

export default AddTask