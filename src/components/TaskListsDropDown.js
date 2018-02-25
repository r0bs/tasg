import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'core-js/fn/array/find'


export default class TaskListsDropDown extends Component {

    handleSelect(event) {
        this.props.selectDefaultList(event.target.value)
    }

    render() {
        return(
            <select 
                className="form-control"
                onChange={this.handleSelect.bind(this)} 
                defaultValue={this.props.tasklists.find(l => l.default)} >
                {
                    this.props.tasklists.map((list)=> {
                        return <option 
                            value={list.id} 
                            selected={list.default} 
                            key={list.id}>
                            {list.title}</option>
                    })
                }
            </select>
        )
    }

}

TaskListsDropDown.propTypes = {
    selectDefaultList: PropTypes.func.isRequired,
    tasklists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired).isRequired
}