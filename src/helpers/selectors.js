export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(days => days.name === day);
  if (!state.appointments || filteredAppointments.length === 0) {
    return [];
  }
  const appointmentsArray = Object.values(state.appointments);
  const appointmentsRes = appointmentsArray.filter(appointmentsArray => filteredAppointments[0].appointments.includes(appointmentsArray.id));
  return appointmentsRes;
}

export function getInterview(state, interview) {
  if (!interview) { return null; }
  const interviewRes = {...interview};
  const interviewer = state.interviewers[interview.interviewer];
  interviewRes.interviewer = interviewer;
  return interviewRes;
}

export function getInterviewersForDay(state, day) {
  const getDay= state.days.filter(days => days.name === day);
  if (!state.appointments || getDay.length === 0) {
    return [];
  }
  console.log('getDay', getDay);
  const interviewersArray = Object.values(state.interviewers);
  const interviewersRes = interviewersArray.filter(interviewersArray=> getDay[0].interviewers.includes(interviewersArray.id));
  console.log('interviewerresult',interviewersRes);
  return interviewersRes;
}