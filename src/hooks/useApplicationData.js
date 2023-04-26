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
      Axios.get('http://localhost:8001/api/days'),
      Axios.get('http://localhost:8001/api/appointments'),
      Axios.get('http://localhost:8001/api/interviewers'),

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


    return Axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then((all) => {
      setState({ ...state, appointments });
    });
  }

  function deleteInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    console.log(appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointments);



    return Axios.delete(`http://localhost:8001/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments });
    });

  }

  return { state, setDay, bookInterview, deleteInterview };
}



