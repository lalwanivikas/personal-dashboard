import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Cell, Textfield } from 'react-mdl'

export class Goals extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      newTodo: ''
    }
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
          <Textfield
            onKeyUp={(e) => this.handleKeyPress(e)}
            onChange={(e) => this.setState({ newTodo: e.target.value})}
            value={this.state.newTodo}
            label="Add new item here"
            floatingLabel
            style={{width: '100%'}}
          />
          {
            this.props.todosByView.items.map(item => {
              return (
                <div key={item.id}>
                  <span key={item.id}>{item.todo_text}</span>
                  <input type='date' />
                </div>
              )
            })
          }

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
