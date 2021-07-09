import React, { Component } from "react";
import  { useState, useEffect } from "react";
import "components/Application.scss";
import DayList     from "./daylist";
import Appointment from "./Appointment";
import { getInterviewersForDay, getInterview, getAppointmentsForDay} from "helper/selector";
// import {getInterview} from 'helper/selector'
// import {getInterviewersForDay} from 'helper/selector'
const axios = require('axios');

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  let interviewers = getInterviewersForDay(state, state.day);

  const setDay =  day => setState(prev => ({ ...prev, day }));

  // let dailyAppointments = [] ;
  let dailyAppointments = getAppointmentsForDay(state, state.day) ;

  useEffect(() => {
    Promise.all([
      (axios.get('api/days')),
      (axios.get('api/appointments')),
      (axios.get('api/interviewers'))
    ]).then((all) => {
      // set your states here with the correct values...
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers:all[2].data}));

    });    
  }, []);

  const parsedAppointments = dailyAppointments.map((appointment) => 
    {
      const interview = getInterview(state, appointment.interview)
      return (
      <Appointment key={appointment.id} {...appointment} interview={interview} interviewers={interviewers} />
)
    })
    
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
        {parsedAppointments}
      </section>
    </main>
  );
}
