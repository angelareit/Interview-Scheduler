import React, { useState, useEffect } from "react";

import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import Axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"



export default function Application(props) {
  const [state, setState] = useState({
    currentDay: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.currentDay);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.currentDay);
    return <Appointment {...appointment}
      key={appointment.id}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      deleteInterview={deleteInterview}
    />
  }
  );

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
    setState({ ...state, appointments });


    Promise.all([
      Axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }),
    ]).then((all) => {
      setState(prev => ({ ...prev }));
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
    setState({ ...state, appointments });


    Promise.all([
      Axios.delete(`http://localhost:8001/api/appointments/${id}`),
    ]).then(() => {
      setState(prev => ({ ...prev }));
    });

  }


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.currentDay}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
