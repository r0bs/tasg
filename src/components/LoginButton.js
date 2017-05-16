import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class LoginButton extends Component {

    onButtonClick() {
        if(this.props.server.isLoggedIn) {
            this.props.logout()
        } else {
            this.props.login()
        }
    }

    render() {
        const ButtonText = this.props.server.isLoggedIn ? "Log Out" : "Log In"

        return(
            <button
                onClick={this.onButtonClick.bind(this)}>
                {ButtonText}
            </button>
        )
    }

}

LoginButton.PropTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
}