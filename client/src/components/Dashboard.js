import React, { Component, PropTypes } from 'react'
import { Grid, Cell} from 'react-mdl'
import TextCard from './TextCard'

const bgColors = {
  pink: '#E91E63',
  blue: '#2196F3',
  teal: '#009688',
  deepOrange: '#FF5722',
  blueGray: '#607D8B'
}


// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function calculateStats(todosArray) {
  let statsArray = []
  const totalItems = todosArray.length;

  const goalsArray = todosArray
    .filter(todo => todo.category === 'goal')
    .map(todo => {
      const dayDiff = dateDiffInDays(new Date(), new Date(todo.target_date))
      return {
        title: dayDiff > 1 ? `${dayDiff} days` : `${dayDiff} day`,
        text: todo.todo_text
      }
    })

  let latestUpdatedItem = todosArray.filter(todo => todo.updated_at !== null)

  if (latestUpdatedItem.updated_at === null || latestUpdatedItem.length === 0) {
    statsArray.push({
      title: '∞ days',
      text: 'since last activity'
    })
  } else {
    latestUpdatedItem = latestUpdatedItem.reduce((prev, curr) => Date.parse(prev.updated_at) - Date.parse(curr.updated_at))
    const dayDiff = dateDiffInDays(new Date(latestUpdatedItem.updated_at), new Date())
    statsArray.push({
      title: dayDiff > 1 ? `${dayDiff} days` : `${dayDiff} day`,
      text: 'since last activity'
    })
  }

  statsArray.push({
    title: `${totalItems} items`,
    text: 'remaining in all lists'
  })

  statsArray = [...goalsArray, ...statsArray]
  return statsArray
}

class Dashboard extends Component {

  constructor() {
    super()
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
    return (
      <div>
        <Grid>
          <Cell col={4}>
            <TextCard
              bgColor={bgColors.blueGray}
              cardTitle='28 items'
              cardText='remaining in all lists'
              buttonText='Update item'
            />
          </Cell>
        </Grid>
        <Grid>
          <Cell col={4}>Hello</Cell>
          <Cell col={4}>Hello</Cell>
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
