import React, { Component } from "react";
import  { useState, useEffect } from "react";
import "components/Application.scss";
import DayList     from "./daylist";
import Appointment from "./Appointment";
const axios = require('axios');

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  // console.log(props);
  const setDay =  day => setState(prev => ({ ...prev, day }));

  const dailyAppointments = [];

  useEffect(() => {

    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ]).then((all) => {
      // set your states here with the correct values...
      // const [first, second, third] = all;
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers:all[2].data}));

    });    
  }, []);
  
  // const listOfAppointments = Object.values(appointments);
  
  const parsed = dailyAppointments
  .map(appointment => <Appointment key={appointment.id} {...appointment} />
    )
    
    console.log(parsed);
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
          <DayList                    //props  
            days={state.days}
            day={state.day}
            setDay={setDay}
            
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsed}
      </section>
    </main>
  );
}
