import React from 'react'
import PropTypes from 'prop-types'

import Login from './Login'
import SignUp from './SignUp'

const Account = ({ title }) => {
  document.title = title
  return (
    <div>
      <Login />
      <SignUp />
    </div>
  )
}

Account.propTypes = {
  title: PropTypes.string
}

export default Account
