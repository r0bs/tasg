import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class TaskListsDropDown extends Component {

    handleSelect(event) {
        this.props.selectDefaultList(event.target.value)
    }

    render() {
        return(
            <select 
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

TaskListsDropDown.PropTypes = {
    selectDefaultList: PropTypes.func.isRequired,
    tasklists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired).isRequired
}