import { connect } from 'react-redux'
import { loginToGoogle, logoutOfGoogle } from '../actions/google'
import LoginButton from '../components/LoginButton'

const mapDispatchToProps = (dispatch) => ({
  login: () => {
    dispatch(loginToGoogle())
  },
  logout: () => {
    dispatch(logoutOfGoogle())
  }
})

const mapStateToProps = (state) => ({
  server: state.server.loginStatus
})


export default connect(mapStateToProps,mapDispatchToProps)(LoginButton)