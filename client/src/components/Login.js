import React from 'react'
import PropTypes from 'prop-types'
import AuthService from '../AuthService'

class Login extends React.Component {
  render() {
    const { auth } = this.props
    return (
      <div>
        <h2>Login</h2>
        <button onClick={auth.login.bind(this)}>Login</button>
      </div>
    )
  }
}

Login.propTypes = {
  location  : PropTypes.object,
  auth      : PropTypes.instanceOf(AuthService)
}

export default Login
