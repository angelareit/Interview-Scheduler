export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(days => days.name === day);
  if(!state.appointments || filteredAppointments.length===0) { 
    console.log('RETURNING EMPTY');
    return []; }
  const appointmentsArray = Object.values(state.appointments);
  const appointmentsForDay = appointmentsArray.filter(appointmentsArray => filteredAppointments[0].appointments.includes(appointmentsArray.id));
  return appointmentsForDay;
}
