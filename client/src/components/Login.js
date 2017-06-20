import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Textfield, Button } from 'react-mdl'

class Login extends Component {

  constructor(props) {
    super(props)
    // set the initial component state
    this.state = {
      errors: {},
      user: {
        name: '',
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
    // const { name, email, password } = this.state.user
    // const formData = encodeURIComponent(`name=${name}&email=${email}&password=${password}`)
    fetch(`API_ENDPOINT/auth/signup`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.user)
    })
    .then(res => {
      if (res.ok) return res.json()
      return res.json()
        .then(data => {
          this.setState({ errors: data.errors })
          throw new Error('incorrect form')
        })
      }
    )
    .then(() => this.setState({ success: true }))
    .catch(console.log)
  }

  render() {
    const { user, errors } = this.state
    return (
      <div className='login-form'>
        <div>
          <h4>Create Account</h4>
          <form onSubmit={this.processForm}>
            <Textfield
              type='text'
              name='name'
              label='Name' floatingLabel
              value={user.name}
              onChange={this.updateInputField}
            />
            {errors.name && <div>{errors.name}</div>}

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

            <Button raised colored>Create Account</Button>

            {errors.message && <div>{errors.message}</div>}
            {
              this.state.success &&
              <div>Account successfully created. <Link to='/login'>Continue to login.</Link></div>
            }

          </form>
        </div>
      </div>
    )
  }
}

// Login.propTypes = {
//   login: PropTypes.func.isRequired
// }

export default Login

        // <div>
        //   <h4>Login</h4>
        //   <form>
        //     <Textfield type='email' label='Email' floatingLabel />
        //     <Textfield type='password' label='Password' floatingLabel />
        //     <Button raised colored>Login</Button>
        //   </form>
        // </div>
