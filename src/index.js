import React from 'react'
import ReactDOM from 'react-dom'

const Hello = ({ name }) => <h1>How are you {name}?</h1>

Hello.propTypes = {
  name: React.PropTypes.string
}

ReactDOM.render(<Hello name='Vikas' />, document.getElementById('root'))
