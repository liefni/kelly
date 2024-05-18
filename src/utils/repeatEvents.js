import moment from 'moment'

const repeatStartsAt = (event, count) => (
  moment(event.startsAt).add(count, event.repeat)
)

const repeatEndsAt = (event, count) => (
  moment(event.endsAt).add(count, event.repeat)
)

const repeatEvents = (events, year) => {
  const from = `${year}-01-01`
  const until = `${year}-12-31`

  const result = []
  events.forEach(event => {
    if (event.repeat && moment(event.startsAt).isBefore(until, 'day')) {
      for (let i = 1; repeatStartsAt(event, i).isSameOrBefore(until, 'day'); i += 1) {
        if (repeatEndsAt(event, i).isSameOrAfter(from)) {
          result.push({
            ...event,
            startsAt: repeatStartsAt(event, i).format('YYYY-MM-DDTHH:MM:SS'),
            endsAt: repeatEndsAt(event, i).format('YYYY-MM-DDTHH:MM:SS')
          })
        }
      }
    }
  })
  return result
}

export default repeatEvents
