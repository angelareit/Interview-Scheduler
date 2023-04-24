import React, { useState, useEffect } from "react";

import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import Axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors"



export default function Application(props) {
  const [state, setState] = useState({
    currentDay: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const newArr = [1, 2, 3];
  newArr.map(val => { return val * 2 });

  const dailyAppointments = getAppointmentsForDay(state, state.currentDay);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return <Appointment key={appointment.id} interview={interview} {...appointment} />
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
