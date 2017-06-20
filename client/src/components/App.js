import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from '../components/Login'
import LeftNav from '../components/LeftNav'
import Dashboard from '../containers/Dashboard'
import CategoryList from '../containers/CategoryList'
import Goals from '../containers/Goals'

import { capitalizeFirstCharacter } from './../helpers'

export class App extends Component {
  render() {
    return (
      <Router>
        <div>

          <Route exact path='/' component={() => (
              <LeftNav title='Dashboard'>
                <Dashboard />
              </LeftNav>
            )}
          />

          <Route path='/goals' component={() => (
              <LeftNav title='Add or update goals'>
                <Goals />
              </LeftNav>
            )}
          />

          <Route path='/list/:category' component={({ match }) => (
              <LeftNav title={capitalizeFirstCharacter(match.params.category)}>
                <CategoryList category={match.params.category} />
              </LeftNav>
            )}
          />

          <Route exact path='/login' component={Login} />

        </div>
      </Router>
    )
  }
}

export default App

// export class App extends Component {
//   render() {
//     return (
//       <Router>
//         <LeftNav>
//           <Route exact path='/' component={Dashboard} />
//           <Route path='/goals'component={Goals} />
//           <Route
//             path='/list/:category'
//             component={({ match }) => <CategoryList category={match.params.category} />}
//           />
//         </LeftNav>
//       </Router>
//     )
//   }
// }
