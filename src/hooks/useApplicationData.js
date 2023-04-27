import { useState, useEffect } from "react";
import Axios from "axios";



export default function useApplicationData() {
  const [state, setState] = useState({
    currentDay: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, currentDay: day });

  useEffect(() => {
    Promise.all([
      Axios.get('/api/days'),
      Axios.get('/api/appointments'),
      Axios.get('/api/interviewers'),

    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });

  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return Axios.put(`/api/appointments/${id}`, { interview })
      .then((all) => {
        setState({ ...state, appointments,  days: updateSpots(state, appointments) });
      });

  }

  const updateSpots = function(state, appointments) {

    const updatedDays = [...state.days];
    return updatedDays.map(day => {

      const appointmentSlots = Object.values(appointments).filter(item => day.appointments.includes(item.id));
      const availableSpots = appointmentSlots.filter(item => item.interview === null).length;
      return { ...day, spots: availableSpots };

    });
  };



  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return Axios.delete(`http://localhost:8001/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments,  days: updateSpots(state, appointments) });
    });

  }

  return { state, setDay, bookInterview, deleteInterview };
}



