import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl'

const LeftNav = ({ children }) => (
  <Layout fixedHeader>

    <Header title="R">
      <Navigation>
        <Link to='/goals'>Add goals</Link>
        <Link to='/'>Sign out</Link>
      </Navigation>
    </Header>

    <Drawer title="R">
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

LeftNav.propTypes = {
  children: PropTypes.node.isRequired
}

export default LeftNav
