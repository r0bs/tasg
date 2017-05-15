import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class DropableDiv extends Component {

    constructor() {
        super();
        this.state = {
            hasFocus: false
        }
    }

    setFocus() {
        this.setState({hasFocus: true})
    }
    
    unsetFocus() {
        this.setState({hasFocus: false})
    }

    render() {
        const {children, onDrop} = this.props;

        return (
            <div
                style={{
                    backgroundColor: this.state.hasFocus ? "#efefef" : "#fff"
                }}
                onDragEnter={() => this.setFocus()}
                onDragOver={ e => { 
                    this.setFocus()
                    e.preventDefault()
                    e.dataTransfer.dropEffect = "move"
                }}

                onDragLeave={() => this.unsetFocus()}
                onDragEnd={() => this.unsetFocus()}
                onDrop={ e => {
                        e.preventDefault()
                        onDrop(e)
                        this.unsetFocus()
                    }
                }
            >
                {children}
            </div>
        )

    }
}

DropableDiv.propTypes = {
  children: PropTypes.node.isRequired,
  onDrop: PropTypes.func.isRequired
}
