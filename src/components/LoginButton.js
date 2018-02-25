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
        const ButtonText = this.props.server.isLoggedIn ? "Logout" : "Login with Google"

        return(
            <button
                type="button"
                className={
                    this.props.server.isLoggedIn ? "btn" : "btn btn-primary"
                }
                onClick={this.onButtonClick.bind(this)}>
                {ButtonText}
            </button>
        )
    }

}

LoginButton.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
}