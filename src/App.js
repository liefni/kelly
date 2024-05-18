import {useState, useEffect, useMemo} from 'react'
import Calendar from './components/Calendar'
import moment from 'moment'
import {Container, Typography} from '@mui/material'
import moonPhaseToEvent from './utils/moonPhaseToEvent'
import repeatEvents from "./utils/repeatEvents";

function App() {
  const [events, setEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'))
  const [moonPhases, setMoonPhases] = useState({})
  const year = moment(selectedDate).format('YYYY')

  useEffect(() => {
    if (!moonPhases[year]) {
      fetch(`https://craigchamberlain.github.io/moon-data/api/moon-phase-data/${year}/`).then(response => {
        response.json().then(data => setMoonPhases(prev => ({...prev, [year]: data})))
      })
    }
  }, [moonPhases, year])

  const moonPhaseEvents = useMemo(() => (
    moonPhases[year]?.map(moonPhaseToEvent) || []
  ), [moonPhases, year])

  const repeatedEvents = useMemo(() => (
    repeatEvents(events, year)
  ), [events, year])

  const allEvents = useMemo(() => (
    [...events, ...moonPhaseEvents, ...repeatedEvents]
  ), [events, moonPhaseEvents])

  return (
    <Container>
      <Typography variant="h1">Calendar</Typography>
      <Calendar selectedDate={selectedDate} events={allEvents}
                onSelectedDateChange={setSelectedDate} onEventsChange={setEvents} />
    </Container>
  );
}

export default App;
