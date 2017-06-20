import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl'

const LeftNav = ({ children, title }) => (
  <Layout fixedHeader>

    <Header title={title}>
      <Navigation>
        <Link to='/goals'>Add goals</Link>
        <Link to='/'>Sign out</Link>
      </Navigation>
    </Header>

    <Drawer title="Vikas Lalwani">
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
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
}

export default LeftNav
