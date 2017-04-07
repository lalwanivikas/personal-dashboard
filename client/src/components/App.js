import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LeftNav from '../components/LeftNav'
import Dashboard from '../containers/Dashboard'
import CategoryList from '../containers/CategoryList'
import Goals from '../containers/Goals'

const App = () => (
  <Router>
    <LeftNav>
      <Route exact path='/' component={Dashboard} />
      <Route path='/goals'component={Goals} />
      <Route
        path='/list/:category'
        component={({ match }) => <CategoryList category={match.params.category} />}
      />
    </LeftNav>
  </Router>
)

export default App
