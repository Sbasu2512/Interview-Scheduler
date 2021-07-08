import React, { Component } from "react";
import  { useState, useEffect } from "react";
import "components/Application.scss";
import DayList     from "./daylist";
import Appointment from "./Appointment";
const axios = require('axios');

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 21,
    time: "1pm",
  },
  {
    id: 4,
    time: "2pm",
    interview: {
      student: "Samuel Roy",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 31,
    time: "2pm",
  },
  {
    id: 27,
    time: "3pm",
    interview: {
      student: " ",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  }
];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  // console.log(props);
  // const setDay =  day => setState({ ...state, day });

  const setDays = function (days) {
    setState(prev => ({ ...prev, days }));

}

  useEffect(() => {
    axios.get('/api/days').then((res) => {
      setDays(res.data); //  setDay(res.data)

    }).catch((err) => {
      console.log("Axios Error ___________",err.message);
    })
    
  }, []);
  


  const listOfAppointments = Object.values(appointments);
  
  // console.log(listOfAppointments);
  
  const parsed = Array.isArray(listOfAppointments) && listOfAppointments
  .map(appointment => <Appointment key={appointment.id} {...appointment} />
    )

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
            setDay={setState}
            
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
