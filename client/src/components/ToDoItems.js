import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Textfield, Checkbox, IconButton, Menu, MenuItem } from 'react-mdl'

class ToDoItems extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showEditModal: false,
      itemBeingEdited: {}
    }
  }

  render() {
    return (
      <div>
        <table
          className="mdl-data-table mdl-js-data-table"
          style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'}}
        >
          <thead>
            <tr>
              <th></th>
              <th className="mdl-data-table__cell--non-numeric" style={{ width: '100%'}}>To Do</th>
              <th className="mdl-data-table__cell--non-numeric">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.items.map(item => (
                <tr key={item.id}>
                  <td><Checkbox label="" onClick={() => console.log(`Edit item ${item.id}`)} /></td>
                  <td className="mdl-data-table__cell--non-numeric">{item.todo_text}</td>
                  <td>
                    <div style={{position: 'relative'}}>
                      <IconButton name="more_vert" id={item.id} />
                      <Menu target={item.id} align="right">
                        <MenuItem onClick={() => this.setState({ showEditModal: true, itemBeingEdited: item })}>Edit</MenuItem>
                        <MenuItem onClick={() => console.log(`Delete item ${item.id}`)}>Delete</MenuItem>
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
                    onChange={() => {}}
                    label='To Do'
                    value={this.state.itemBeingEdited.todo_text}
                    style={{width: '100%'}}
                  />
                </DialogContent>
                <DialogActions>
                  <Button type='button'>Done</Button>
                  <Button type='button' onClick={() => this.setState({ showEditModal: !this.state.showEditModal })}>Cancel</Button>
                </DialogActions>
              </Dialog>
            : ''
        }
      </div>
    )
  }

}

ToDoItems.propTypes = {
  items: PropTypes.array.isRequired
}

export default ToDoItems

// <button id={item.id} className="mdl-button mdl-js-button mdl-button--icon">
//   <i className="material-icons">more_vert</i>
// </button>
// <ul
//   className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
//   htmlFor={item.id}
// >
//   <li className="mdl-menu__item" onClick={() => this.setState({ showEditModal: true, itemBeingEdited: item })}>Edit</li>
//   <li className="mdl-menu__item" onClick={() => console.log(`Delete item ${item.id}`)}>Delete</li>
// </ul>
