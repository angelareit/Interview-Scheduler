import React, { useState, useEffect } from "react";

import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import Axios from "axios";

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

export default function Application(props) {
  const appointmentsArray = Object.values(appointments).map((appointment) =>
    <Appointment key={appointment.id} {...appointment} />);

  const [state, setState] = useState({
    currentDay: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });


  const setDay = day => setState({ ...state, currentDay: day });

  const setDays = (days) => {
    setState(prev => ({ ...prev, days}));
  }


  useEffect(() => {
    const apiURL = ` http://localhost:8001/api/days`;
    Axios.get(apiURL).then(response => {
      console.log(response.data);
      setDays(response.data)
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
        />      </section>
      <section className="schedule">
        {appointmentsArray}
      </section>
    </main>
  );
}
