import React, { Component, PropTypes } from 'react'
import { Grid, Cell} from 'react-mdl'

// components
import TextCard from './TextCard'

// helpers
import { calculateStats, shuffleArray } from '../helpers'

const bgColors = {
  pink: '#E91E63',
  blue: '#2196F3',
  teal: '#009688',
  deepOrange: '#FF5722',
  blueGray: '#607D8B'
}

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      stats: []
    }
  }

  componentDidMount() {
    this.props.fetchTodos('')
  }

  componentWillReceiveProps(props) {
    this.setState({
      stats: calculateStats(props.todosByView.items)
    })
  }

  render() {
    const shuffledArray = shuffleArray(this.state.stats)
    return (
      <div>
        <Grid>
          {
            shuffledArray.map((stat, index) => {
              const keys = Object.keys(bgColors)
              return (
                <Cell col={4} key={index}>
                  <TextCard
                    bgColor={bgColors[keys[index % Object.keys(bgColors).length]]}
                    cardTitle={stat.title}
                    cardText={stat.text}
                    buttonText={stat.type === 'goal' ? 'Update goal': ''}
                  />
                </Cell>
              )
            })
          }
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  activeView  : PropTypes.string.isRequired,
  todosByView : PropTypes.object.isRequired,
  setView     : PropTypes.func.isRequired,
  fetchTodos  : PropTypes.func.isRequired
}

export default Dashboard
