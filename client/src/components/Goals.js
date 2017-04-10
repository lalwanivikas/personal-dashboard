import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Cell } from 'react-mdl'
import GoalForm from './GoalForm'

export class Goals extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }

  createNewGoal(goalText, targetDate) {
    this.props.createTodo({
      "category": 'goal',
      "todo_text": goalText,
      "todo_status": "FALSE",
      "created_at": "now()",
      "updated_at": null,
      "target_date": targetDate
    })
  }

  submitEditedItem(id, newItem) {
    const editedItem = Object.assign({}, newItem)
    delete editedItem.id
    this.props.editTodo(id, editedItem)
  }

  setNewTargetDay() {

  }

  componentDidMount() {
    this.props.fetchTodos('goal')
  }

  componentWillReceiveProps(nextProps){
    this.setState({ items: nextProps.todosByView.items })
  }

  render() {
    return (
      <Grid>
        <Cell col={2}></Cell>
        <Cell col={8}>
          <GoalForm
            label='Add new goal here'
            goalText=''
            onFormSubmit={(goalText, targetDate) => this.createNewGoal(goalText, targetDate)}
            newTargetDay={() => this.setNewTargetDay()}
          />
          <div style={{ padding: '.5rem 0' }}>
            <h4 style={{ padding: '1rem 0 0 1rem', marginBottom: 0 }}>Existing goals</h4>
            {
              this.state.items.map(item => (
                <GoalForm
                  key={item.id}
                  label=''
                  goalText={item.todo_text}
                  onFormSubmit={(id, newItem) => this.submitEditedItem(id, newItem)}
                  currentTargetDay={new Date(item.target_date)}
                  newTargetDay={() => this.setNewTargetDay()}
                />
              ))
            }
          </div>
        </Cell>
        <Cell col={2}></Cell>
      </Grid>
    )
  }
}


Goals.propTypes = {
  todosByView : PropTypes.object.isRequired,
  fetchTodos  : PropTypes.func.isRequired,
  createTodo  : PropTypes.func.isRequired,
  editTodo    : PropTypes.func.isRequired,
  deleteTodo  : PropTypes.func.isRequired
}

export default Goals
