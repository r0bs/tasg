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
                <form className="form-inline" onSubmit={(e) => this.submitNewTasklistForm(e)}>
                    <input
                        className="form-control"
                        ref={node => {
                        this.input = node
                    }} />
                    <button className="btn" type="submit">
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                </form>
            </div>
        )
    }

}

AddList.PropTypes = {
    addTasklist: PropTypes.func.isRequired
}