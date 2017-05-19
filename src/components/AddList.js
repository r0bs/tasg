import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class AddList extends Component {

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
                    <button type="submit">
                        Add List
                    </button>
                </form>
            </div>
        )
    }

}

AddList.PropTypes = {
    addTasklist: PropTypes.func.isRequired
}