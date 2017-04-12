import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LeftNav from '../components/LeftNav'
import Dashboard from '../containers/Dashboard'
import CategoryList from '../containers/CategoryList'
import Goals from '../containers/Goals'
import Login from '../components/Login'

import AuthService from '../AuthService'

const auth = new AuthService('2ffF9VsUB3O7EKOEQKOvsSGje93Hiiyo', 'lalwanivikas.auth0.com')

// validate authentication for private routes
// const requireAuth = (nextState, replace) => {
//   if (!auth.loggedIn()) {
//     replace({ pathname: '/login' })
//   }
// }

const App = () => (
  <Router>
    <LeftNav>
      <Route exact path='/' component={Dashboard} auth={auth} />
      <Route path='/goals'component={Goals} />
      <Route
        path='/list/:category'
        component={({ match }) => <CategoryList category={match.params.category} />}
      />
      <Route
        path='/login'
        component={() => <Login auth={auth} />}
      />
    </LeftNav>
  </Router>
)

export default App
