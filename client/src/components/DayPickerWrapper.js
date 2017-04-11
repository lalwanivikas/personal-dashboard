import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DayPicker from 'react-day-picker'
import { Textfield } from 'react-mdl'

import 'react-day-picker/lib/style.css'

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  zIndex: 1,
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
}

class DayPickerWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showOverlay: false,
      value: '',
      selectedDay: props.currentTargetDay,
    }
    this.input = null
    this.daypicker = null
    this.clickedInside = false
    this.clickTimeout = null
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleContainerMouseDown = this.handleContainerMouseDown.bind(this)
  }

  componentWillUnmount() {
    clearTimeout(this.clickTimeout)
  }

  handleContainerMouseDown() {
      this.clickedInside = true
      // The input's onBlur method is called from a queue right after onMouseDown event.
      // setTimeout adds another callback in the queue, but is called later than onBlur event
      this.clickTimeout = setTimeout(() => {
        this.clickedInside = false
      }, 0)
    }

    handleInputFocus() {
      this.setState({
        showOverlay: true,
      })
    }

    handleInputBlur() {
      const showOverlay = this.clickedInside
      this.setState({
        showOverlay,
      })
    }

    handleInputChange(e) {
      const { value } = e.target
      const momentDay = moment(value, 'L', true)
      if (momentDay.isValid()) {
        this.setState({
          selectedDay: momentDay.toDate(),
          value,
        }, () => {
          this.daypicker.showMonth(this.state.selectedDay)
        })
      } else {
        this.setState({ value, selectedDay: null })
      }
    }


    handleDayClick(day) {
      this.setState({
        value: moment(day).format('L'),
        selectedDay: day,
        showOverlay: false,
      })
      this.input.inputRef.blur()
      this.props.setNewDay(day)
    }

  render() {
    return (
      <div onMouseDown={ this.handleContainerMouseDown}>
        <Textfield
          label='target date'
          ref={ (el) => { this.input = el } }
          placeholder={ moment(this.props.currentTargetDay).format("MMM Do YY") || `DD/MM/YYYY`}
          value={ this.state.value }
          onChange={ this.handleInputChange }
          onFocus={ this.handleInputFocus }
          onBlur={ this.handleInputBlur }
        />
        { this.state.showOverlay &&
          <div style={{ position: 'relative' }}>
            <div style={ overlayStyle }>
              <DayPicker
                ref={ (el) => { this.daypicker = el } }
                initialMonth={ this.state.selectedDay || undefined }
                onDayClick={ this.handleDayClick }
                selectedDays={ this.state.selectedDay }
                disabledDays={ day => day < Date.now() }
              />
            </div>
          </div>
        }
      </div>
    )
  }
}

DayPickerWrapper.propTypes = {
  currentTargetDay  : PropTypes.object,
  setNewDay         : PropTypes.func.isRequired,
}


export default DayPickerWrapper
