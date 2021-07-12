import  React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  //state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });
  
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers"),
    ]).then((all) => {
      // set your states here with the correct values...
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  //update spots function
  const updateSpots = function (apointmentId, action) {
    let appointmentCounter = 0;
    const freeDays = state.days.find(day => day.appointments.includes(apointmentId));
    // count the number of appointments booked in previous state
    freeDays.appointments.forEach(appointment => {
      if (state.appointments[appointment].interview === null) {
        appointmentCounter += 1;
      }
    });

    if(action === 'book'){
      appointmentCounter -= 1;
    }

    if(action === 'cancel'){
      appointmentCounter += 1 ;
    }

    const updatedDayArr = state.days.map(day => {
      if (day.name === freeDays.name) {
        return {...freeDays, spots: appointmentCounter}
      }
      return day;
    });

    return updatedDayArr;
}    

  function bookInterview(id, interview) {
    // console.log(id, interview);
    const putURL = "http://localhost:8001/api/appointments";
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return new Promise((resolve, reject) => {
      return axios
        .put(`${putURL}/${id}`, appointment)
        .then((response) => {
          const updatedSpotsArr = updateSpots(id, "book");
          setState({
            ...state,
            appointments,
            days: updatedSpotsArr
          });
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const putURL = "http://localhost:8001/api/appointments";
    return new Promise((resolve, reject) => {
      return axios
        .delete(`${putURL}/${id}`)
        .then((response) => {
          const updatedSpotsArr = updateSpots(id, "cancel");
          setState({
            ...state,
            appointments,
            days: updatedSpotsArr
          });
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };



  return { state, setDay, bookInterview, deleteInterview, updateSpots };
}
