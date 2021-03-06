import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { Textfield, Button } from 'react-mdl'
// import PropTypes from 'prop-types'

import Auth from './../Auth'

class Login extends Component {

  constructor(props) {
    super(props)
    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      },
      success: false
    }
    this.updateInputField = this.updateInputField.bind(this)
    this.processForm = this.processForm.bind(this)
  }

  updateInputField(event) {
    const field = event.target.name
    const user = this.state.user
    user[field] = event.target.value
    this.setState({
      user
    })
  }

  processForm(event) {
    event.preventDefault()
    fetch(`API_ENDPOINT/auth/login`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.user)
    })
    .then(res => {
      // console.log(res);
      if (res.ok) { return res.json() }
      return res.json()
        .then(data => {
          this.setState({ errors: data.errors })
          throw new Error('incorrect form')
        })
      }
    )
    .then((data) => {
      // console.log(data)
      this.setState({ success: true })
      // save the token
      Auth.authenticateUser(data.token);

      // save name in local storage
      Auth.setName(data.user.name)

      // change the current URL to /
      window.location = '/';
    })
    .catch(() => this.setState({ errors: {message: 'unable to log in at this moment'} }))
  }

  render() {
    const { user, errors, success } = this.state
    return (
      <div className='login-form'>
        <div>
          <h4>Login</h4>
          <form onSubmit={this.processForm}>

            <Textfield
              type='email'
              name='email'
              label='Email' floatingLabel
              value={user.email}
              onChange={this.updateInputField}
            />
            {errors.email && <div>{errors.email}</div>}

            <Textfield
              type='password'
              name='password'
              label='Password' floatingLabel
              value={user.password}
              onChange={this.updateInputField}
            />
            {errors.password && <div>{errors.password}</div>}

            <Button raised colored>Login</Button>

            {(errors.message && !success) && <div>{errors.message}</div>}

          </form>
        </div>
      </div>
    )
  }
}

// Login.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default Login
