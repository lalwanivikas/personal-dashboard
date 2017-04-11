// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}


export function calculateStats(todosArray) {

  let statsArray = []

  const totalItems = todosArray.length
  statsArray.push({
    title: `${totalItems} items`,
    text: 'remaining in all lists',
    type: 'stat'
  })

  const goalsArray = todosArray
    .filter(todo => todo.category === 'goal')
    .map(todo => {
      const dayDiff = dateDiffInDays(new Date(), new Date(todo.target_date))
      return {
        title: dayDiff > 1 ? `${dayDiff} days` : `${dayDiff} day`,
        text: `left in ${todo.todo_text}`,
        type: 'goal'
      }
    })

  let latestUpdatedItems = todosArray.filter(todo => todo.updated_at !== null)
  if (latestUpdatedItems.length === 0) {
    statsArray.push({
      title: '∞ days',
      text: 'since last activity',
      type: 'stat'
    })
  } else {
    const latestUpdatedItem = latestUpdatedItems.sort((prev, curr) => Date.parse(curr.updated_at) - Date.parse(prev.updated_at))[0]
    const dayDiff = dateDiffInDays(new Date(latestUpdatedItem.updated_at), new Date())
    statsArray.push({
      title: dayDiff > 1 ||  dayDiff === 0 ? `${dayDiff} days` : `${dayDiff} day`,
      text: 'since last activity',
      type: 'stat'
    })
  }

  statsArray = [...goalsArray, ...statsArray]
  return statsArray
}


export function shuffleArray(array) {
  let currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
