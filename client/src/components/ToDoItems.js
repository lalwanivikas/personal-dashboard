import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Textfield, Checkbox, IconButton, Menu, MenuItem } from 'react-mdl'

class ToDoItems extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showEditModal: false,
      itemBeingEdited: {},
      editedText: ''
    }
  }

  submitEditedItem(id, newItem) {
    const editedItem = Object.assign({}, newItem)
    delete editedItem.id
    this.props.editTodo(id, editedItem)
  }

  render() {
    return (
      <div>
        <table
          className="mdl-data-table mdl-js-data-table"
          style={{ marginBottom: '4rem', boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)' }}
        >
          <tbody>
            {
              this.props.items.map(item => (
                <tr key={item.id}>
                  <td>
                    <Checkbox label="" onClick={() => {
                      this.submitEditedItem(item.id, Object.assign({}, item, {todo_status: !item.todo_status}))
                    }}/>
                  </td>
                  <td className="mdl-data-table__cell--non-numeric" style={{ width: '100%', whiteSpace: 'normal'}}>{item.todo_text}</td>
                  <td>
                    <div style={{position: 'relative'}}>
                      <IconButton name="more_vert" id={item.id} />
                      <Menu target={item.id} align="right">
                        <MenuItem
                          onClick={() => this.setState({
                            showEditModal: true,
                            itemBeingEdited: item,
                            editedText: item.todo_text
                          })}>Edit
                        </MenuItem>
                        <MenuItem onClick={() => this.props.deleteTodo(item.id, item.category)}>Delete</MenuItem>
                      </Menu>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          this.state.showEditModal
            ? <Dialog open={this.state.showEditModal}>
                <DialogTitle>Edit To Do</DialogTitle>
                <DialogContent>
                  <Textfield
                    onChange={(e) => this.setState({ editedText: e.target.value })}
                    value={this.state.editedText}
                    label='To Do'
                    style={{width: '100%'}}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    type='button'
                    onClick={() => {
                      const itemBeingEdited = this.state.itemBeingEdited
                      this.submitEditedItem(itemBeingEdited.id, Object.assign({}, itemBeingEdited, {todo_text: this.state.editedText}))
                      this.setState({ showEditModal: false })
                    }}>Done
                  </Button>
                  <Button type='button' onClick={() => this.setState({ showEditModal: false })}>Cancel</Button>
                </DialogActions>
              </Dialog>
            : ''
        }
      </div>
    )
  }

}

ToDoItems.propTypes = {
  items       : PropTypes.array.isRequired,
  editTodo    : PropTypes.func.isRequired,
  deleteTodo  : PropTypes.func.isRequired
}

export default ToDoItems
