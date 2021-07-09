import  React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });
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
          setState({
            ...state,
            appointments,
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
          setState({
            ...state,
            appointments,
          });
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

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

  return { state, setDay, bookInterview, deleteInterview };
}
