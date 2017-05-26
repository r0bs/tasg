import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class TaskListsList extends Component {

    handleSelect(id) {
        this.props.selectDefaultList(id)
    }

    render() {
        return (
            <ul>
                {
                    this.props.tasklists.map((list) => {
                        return (
                            <li style={{ 
                                cursor: "pointer",
                                fontWeight: list.default ? "bold" : "" }}
                                key={list.id}
                                onClick={this.handleSelect.bind(this, list.id)}>
                                {list.title}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

}

TaskListsList.PropTypes = {
    selectDefaultList: PropTypes.func.isRequired,
    tasklists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired).isRequired
}