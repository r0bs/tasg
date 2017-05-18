import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class AddTasklist extends Component {

    submitNewTasklistForm(e) {
        e.preventDefault()
        if (!this.input.value.trim()) {
            return
        }
        this.props.addTasklist(this.input.value)
        this.input.value = ''
    }

    render() {
        return(
            <div>
                <form onSubmit={(e) => this.submitNewTasklistForm(e)}>
                    <input ref={node => {
                        this.input = node
                    }} />
                </form>
            </div>
        )
    }

}

AddTasklist.PropTypes = {
    addTasklist: PropTypes.func.isRequired
}