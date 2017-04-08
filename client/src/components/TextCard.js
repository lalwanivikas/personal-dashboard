import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText, CardMenu, IconButton, Menu, MenuItem } from 'react-mdl'
import { Link } from 'react-router-dom'

const TextCard = ({ bgColor, cardTitle, cardText, buttonText }) => (
  <Card shadow={3} style={{background: bgColor, width: '100%'}}>
    <CardTitle style={{color: '#fff', display: 'inline-block'}}>
      <h1 style={{marginBottom: '0'}}>{cardTitle}</h1>
    </CardTitle>
    <CardText style={{color: '#fff'}}>
      <h4 style={{marginTop: '0'}}>{cardText}</h4>
    </CardText>
    {
      buttonText
        ? <CardMenu style={{color: '#fff'}}>
            <div style={{position: 'relative'}}>
              <IconButton name="more_vert" id={cardTitle} />
              <Menu target={cardTitle} align="right">
                <MenuItem>
                  <Link to='/goals' style={{ textDecoration: 'none', color: '#111' }}>{buttonText}</Link>
                </MenuItem>
              </Menu>
            </div>
          </CardMenu>
        : ''
    }
  </Card>
)

TextCard.propTypes = {
  bgColor   : PropTypes.string.isRequired,
  cardTitle : PropTypes.string.isRequired,
  cardText  : PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
}

export default TextCard
