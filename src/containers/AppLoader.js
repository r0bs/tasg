import React, { Component } from 'react'
import { connect } from 'react-redux'
import App from '../components/App'
import { laodGoogleClientAsync } from '../actions/google'

class AppLoader extends Component {

  constructor(props){
    super(props)
    this.dispatch = this.props.dispatch;
    this.dispatch(laodGoogleClientAsync())
  }

  render() {

    if(!this.props.initialLoginStatusChecked || (this.props.isLoggedIn && !this.props.hasFetchedOnce)) {
      return(
        <div className="appload">
          <div className="loader" />
        </div>
      )
    } else {
      return <App />
    }
    
  }

}

const mapStateToProps = (state) => ({
  initialLoginStatusChecked: state.server.loginStatus.initialLoginStatusChecked,
  isLoggedIn: state.server.loginStatus.isLoggedIn,
  hasFetchedOnce: state.server.hasFetchedOnce
})

export default connect(mapStateToProps,null)(AppLoader)