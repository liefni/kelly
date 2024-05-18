const phaseNames = {
  0: 'New Moon',
  1: 'First Quarter',
  2: 'Full Moon',
  3: 'Last Quarter'
}

const moonPhaseToEvent = (moonPhase) => {
  const {Date, Phase} = moonPhase
  return {
    title: phaseNames[Phase],
    startsAt: Date,
    endsAt: Date,
    description: 'From Moon API'
  }
}

export default moonPhaseToEvent
