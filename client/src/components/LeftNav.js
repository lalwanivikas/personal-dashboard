import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl'

import Auth from './../Auth'

const LeftNav = ({ children, title }) => {
  document.title = title
  return (
    <Layout fixedHeader>

      <Header title={title}>
        <Navigation>
          <Link to='/goals'>Add goals</Link>
          <a
            onClick={() => {
              Auth.deauthenticateUser()
              window.location = '/login'
            }}
            style={{cursor: 'pointer'}}
          >Sign out</a>
        </Navigation>
      </Header>

      <Drawer title={Auth.getName() !== null ? Auth.getName() : 'Anon Champ'}>
        <Navigation>
          <Link to='/'>Dashboard</Link>
          <Link to='/list/work'>Work</Link>
          <Link to='/list/misc'>Misc</Link>
        </Navigation>
      </Drawer>

      <Content>
        {children}
      </Content>

    </Layout>
  )
}

LeftNav.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
}

export default LeftNav
