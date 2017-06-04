import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import Flatpickr from 'react-flatpickr'

import 'tasg-theme/flatpickr.min.css'

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
            date: moment(date[0].toISOString())
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
                    <Flatpickr 
                        onChange={(choosendate) => this.handleDateChange(choosendate)} 
                        className="form-control"
                        options={{
                            defaultDate: moment().format("YYYY-MM-DD"),
                            dateFormat: "Y-m-d"
                        }}
                        />
                    <button type="submit" className="btn btn-default">
                        <span className="visible-lg">Add Task</span>
                        <span className="glyphicon glyphicon-plus hidden-lg"></span>
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


///<MenuToggle toggleMenu={this.props.toggleMenu}/>