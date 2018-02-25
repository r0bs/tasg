import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TaskListsList extends Component {

    handleSelect(id) {
        this.props.selectDefaultList(id)
    }

    removeTasklist(list) {
        var listToDelete = prompt("Enter name of list to delete it");
        if(listToDelete === list.title) {
            alert("List '" + list.title + "' deleted.")
            return this.props.removeTasklist(list.id)
        }
        alert("Names don't match. Keeping list.")
    }

    render() {
        return (
            <ul>
                {
                    this.props.tasklists.map((list) => {
                        return (
                            <li key={list.id}>
                                <span 
                                style={{ 
                                    cursor: "pointer",
                                    fontWeight: list.default ? "bold" : "" }}
                                onClick={this.handleSelect.bind(this, list.id)}>
                                {list.title}
                                </span>
                                <span 
                                style={{ 
                                    cursor: "pointer"
                                }}
                                onClick={() => this.removeTasklist(list)}
                                > (-)</span>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

}

TaskListsList.propTypes = {
    selectDefaultList: PropTypes.func.isRequired,
    removeTasklist: PropTypes.func.isRequired,
    tasklists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired).isRequired
}