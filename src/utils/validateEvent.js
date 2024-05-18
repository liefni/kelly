import moment from 'moment'

const validateEvent = (event) => {
  const errors = {}

  if (!event.title) {
    errors.title = errors.title || []
    errors.title.push('required')
  }

  if (!event.startsAt) {
    errors.startsAt = errors.startsAt || []
    errors.startsAt.push('required')
  }

  if (!event.endsAt) {
    errors.endsAt = errors.endsAt || []
    errors.endsAt.push('required')
  }

  if (moment(event.endsAt).isBefore(event.startsAt)) {
    errors.endsAt = errors.endsAt || []
    errors.endsAt.push('must be after start time')
  }

  return errors
}

export default validateEvent