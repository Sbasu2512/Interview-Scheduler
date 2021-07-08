import React, { useEffect } from 'react';
//local imports
import './styles.scss';
import Header from "components/Appointment/header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/show";
// import Confirm from "components/Appointment/confirm";
// import Status from "components/Appointment/status";
// import { Error } from "components/Appointment/Error";
// import Form from "components/Appointment/form";


export default function Appointment(props) {

  // console.log(props);

  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
    </article>
    )
}