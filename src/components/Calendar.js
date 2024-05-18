import {useCallback, useState, useMemo} from 'react'
import ControlledForm, {Input} from './ControlledForm'
import {Card, CardHeader, CardContent, Typography, Button, TextField, Stack, MenuItem} from '@mui/material'
import moment from 'moment'
import validateEvent from '../utils/validateEvent'

const Calendar = (props) => {
  const {selectedDate, events, onSelectedDateChange, onEventsChange} = props

  const handleSelectedDateChange = useCallback((e) => (
    onSelectedDateChange(e.target.value)
  ), [onSelectedDateChange])

  const [newEvent, setNewEvent] = useState({})
  const [eventErrors, setEventErrors] = useState({})
  const addEvent = useCallback(() => {
    const errors = validateEvent(newEvent)
    setEventErrors(errors)
    if (!Object.values(errors).length) {
      onEventsChange(prev => [...prev, newEvent])
      setNewEvent({})
    }
  }, [newEvent, onEventsChange])

  const displayEvents = useMemo(() => (
    events.filter(event => (
      moment(selectedDate).isBetween(event.startsAt, event.endsAt, 'day', '[]')
    )).sort((a, b) => moment(b).valueOf() - moment(a).valueOf())
  ), [events, selectedDate])

  return (
    <div>
      <Stack spacing={3}>
        <Card>
          <CardHeader title="Add Event" />
          <CardContent>
            <ControlledForm data={newEvent} onChange={setNewEvent} onSubmit={addEvent} errors={eventErrors}>
              <Stack spacing={2}>
                <Input name="title" label="Title" />
                <Input name="startsAt" type="datetime-local" label="Starts At" InputLabelProps={{shrink: true}} />
                <Input name="endsAt" type="datetime-local" label="Ends At" InputLabelProps={{shrink: true}} />
                <Input name="description" label="Description" multiline />
                <Input name="repeat" label="Repeat" select>
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="weeks">Weekly</MenuItem>
                  <MenuItem value="months">Monthly</MenuItem>
                  <MenuItem value="years">Yearly</MenuItem>
                </Input>
                <Button type="submit">Add</Button>
              </Stack>
            </ControlledForm>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Events"></CardHeader>
          <CardContent>
            <TextField type="date" value={selectedDate} label="Show Date" onChange={handleSelectedDateChange}/>
            {displayEvents?.length ? (
              <ul>
                {displayEvents.map(event => (
                  <li>
                    <dl>
                      <dt>Title</dt>
                      <dd>{event.title}</dd>
                      <dt>Starts At</dt>
                      <dd>{event.startsAt}</dd>
                      <dt>Ends At</dt>
                      <dd>{event.endsAt}</dd>
                      <dt>Description</dt>
                      <dd>{event.description}</dd>
                      <dt>Repeat</dt>
                      <dd>{event.repeat || 'None'}</dd>
                    </dl>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography paragraph>No Events for this day</Typography>
            )}
          </CardContent>
        </Card>
      </Stack>
    </div>
  )
}

export default Calendar
