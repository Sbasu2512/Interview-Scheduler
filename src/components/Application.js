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

   function bookInterview(id, interview) {
    // console.log(id, interview);
    const putURL = "http://localhost:8001/api/appointments" ;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return new Promise ((resolve,reject) => {
      return axios.put(`${putURL}/${id}`, appointment)
      .then((response) => {
                              setState({
                                ...state,
                                appointments
                              });
                              resolve(response)
      }).catch((err)=> {
        reject(err);
      })
    })
    

  }

  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...null }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const putURL = "http://localhost:8001/api/appointments" ;
    return new Promise((resolve, reject)=> {
      return axios.delete(`${putURL}/${id}`)
      .then((response) => {
        setState({
          ...state,
          appointments
        });
        resolve(response);
      })
      .catch((e) => {
        reject(e)
      })
    }) 



  };

  const interviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day) ;

  const setDay =  day => setState(prev => ({ ...prev, day }));


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
      //this is where we are passing function as props
      return (
      <Appointment key={appointment.id} {...appointment} interview={interview} interviewers={interviewers} bookInterview={bookInterview} deleteInterview={deleteInterview} />
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
