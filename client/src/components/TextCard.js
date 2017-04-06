import React, { PropTypes } from 'react'
import { Card, CardTitle, CardText, CardActions, Button } from 'react-mdl'

const TextCard = ({ bgColor, cardTitle, cardText, buttonText }) => (
  <Card shadow={3} style={{background: bgColor, width: '90%'}}>
    <CardTitle style={{color: '#fff', display: 'inline-block'}}>
      <h1 style={{marginBottom: '0'}}>{cardTitle}</h1>
    </CardTitle>
    <CardText style={{color: '#fff'}}>
      <h4 style={{marginTop: '0'}}>{cardText}</h4>
    </CardText>

    {
      buttonText
        ? <CardActions border>
            <Button style={{color: '#fff'}}>{buttonText}</Button>
          </CardActions>
        : ''
    }

  </Card>
)

TextCard.propTypes = {
  bgColor: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  cardText: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
}

export default TextCard
