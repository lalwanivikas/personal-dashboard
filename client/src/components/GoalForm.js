import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Cell, Textfield, Button } from 'react-mdl'
import DayPickerWrapper from './DayPickerWrapper'

class GoalForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todoText: props.goalText,
      targetDate: props.currentTargetDay,
      id: props.id
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { todoText, id } = this.state
    const targetDate =  new Date(this.state.targetDate).getTime()/1000 // converting milliseconds to seconds
    this.props.onFormSubmit(todoText, targetDate, id)
    if(this.props.type === 'new') {
      this.setState({ todoText: '' })
    }
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <Grid>
          <Cell col={6}>
            <Textfield
              required
              pattern='.*\S.*'
              label={this.props.label}
              floatingLabel
              style={{width: '100%'}}
              value={this.state.todoText}
              onChange={(e) => this.setState({ todoText: e.target.value })}
            />
          </Cell>
          <Cell col={3}>
            <DayPickerWrapper
              currentTargetDay={this.state.targetDate}
              setNewDay={day => this.setState({ targetDate: day })}
            />
          </Cell>
          <Cell col={3}>
            <Button raised ripple style={{marginRight: '.5rem'}} type='submit'>
              { this.props.type === 'new' ? 'Create' : 'Update' }
            </Button>
            {
              this.props.type === 'existing'
                ? <Button
                    raised ripple
                    onClick={(e) => {
                      e.preventDefault()
                      this.props.deleteGoal(this.props.id)
                    }}
                  >
                    Delete
                  </Button>
                : ''
            }
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
  type              : PropTypes.string.isRequired,
  deleteGoal        : PropTypes.func,
  id                : PropTypes.string
}

export default GoalForm

// defaultValue={this.props.goalText}
