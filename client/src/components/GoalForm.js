import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Cell, Textfield, Button } from 'react-mdl'
import DayPickerWrapper from './DayPickerWrapper'

class GoalForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onFormSubmit}>
        <Grid>
          <Cell col={6}>
            <Textfield
              required
              pattern='.*\S.*'
              label={this.props.label}
              floatingLabel
              style={{width: '100%'}}
              defaultValue={this.props.goalText}
            />
          </Cell>
          <Cell col={3}>
            <DayPickerWrapper
              currentTargetDay={this.props.currentTargetDay}
              newTargetDay={day => this.props.newTargetDay(day)}
            />
          </Cell>
          <Cell col={3}>
            <Button raised ripple style={{marginRight: '.5rem'}}>
              Update
            </Button>
            <Button raised ripple>
              Delete
            </Button>
          </Cell>
        </Grid>
      </form>
    )
  }
}

GoalForm.propTypes = {
  onFormSubmit      : PropTypes.func.isRequired,
  goalText          : PropTypes.string.isRequired,
  label             : PropTypes.string.isRequired,
  currentTargetDay  : PropTypes.object,
  newTargetDay      : PropTypes.func.isRequired,
}

export default GoalForm

// <Textfield
//   label='Select date'
//   floatingLabel
//   style={{width: '100%'}}
// />
