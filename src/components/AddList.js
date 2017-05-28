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
            <div className="add-list">
                <form className="form-inline" onSubmit={(e) => this.submitNewTasklistForm(e)}>
                    <div className="input-group">
                        <input
                            className="form-control"
                            placeholder="New List Title"
                            ref={node => {
                                this.input = node
                            }} />
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="submit">
                                <span className="glyphicon glyphicon-plus"></span>
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        )
    }

}

AddList.PropTypes = {
    addTasklist: PropTypes.func.isRequired
}