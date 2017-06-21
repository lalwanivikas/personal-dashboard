import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Account from '../components/Account'
import LeftNav from '../components/LeftNav'
import Dashboard from '../containers/Dashboard'
import CategoryList from '../containers/CategoryList'
import Goals from '../containers/Goals'

import Auth from './../Auth'
import { capitalizeFirstCharacter } from './../helpers'

export class App extends Component {
  render() {
    return (
      <Router>
        <div>

          <Route exact path='/' component={() => (
            Auth.isUserAuthenticated()
              ? <LeftNav title='Dashboard'>
                  <Dashboard />
                </LeftNav>
              : <Redirect to='/login' />
            )}
          />

          <Route path='/goals' component={() => (
            Auth.isUserAuthenticated()
              ? <LeftNav title='Add or update goals'>
                  <Goals />
                </LeftNav>
              : <Redirect to='/login' />
            )}
          />

          <Route path='/list/:category' component={({ match }) => (
            Auth.isUserAuthenticated()
              ? <LeftNav title={capitalizeFirstCharacter(match.params.category)}>
                  <CategoryList category={match.params.category} />
                </LeftNav>
              : <Redirect to='/login' />
            )}
          />

          <Route exact path='/login' component={() => (
            Auth.isUserAuthenticated()
              ? <LeftNav title='Dashboard'>
                  <Dashboard />
                </LeftNav>
              : <Account title='Login or signup'/>
          )} />

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
