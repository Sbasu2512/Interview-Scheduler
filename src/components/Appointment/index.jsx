import React, { useEffect, useReducer } from 'react';
//local imports
import './styles.scss';
import Header from "components/Appointment/header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/show";
import Form from 'components/Appointment/form';
import Status from 'components/Appointment/status';
import Confirm from 'components/Appointment/confirm';
import Error from 'components/Appointment/Error';

import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';



export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    
    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [mode, transition, props.interview])

  //save the interview
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    if (name && interviewer) {
      transition(SAVING);
      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true))
    }
  }
//delete the interview
  function remove() {
      transition(DELETING, true)
      props.deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE &&
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={e => back()}
          onEdit = {props.onEdit}
          onDelete = {() => transition(CONFIRM)} 
          // onChange = {setInterviewer}
        />}
        {mode === SAVING && <Status message="Saving" />}
        {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={e => back()}/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={e => back()}/>}
      {mode === CONFIRM && 
        <Confirm 
          onCancel={e => back()}
          onConfirm={remove}
          message="Are you sure you would like to delete?" 
        />}
      {mode === EDIT &&
        <Form 
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
          name={props.interview.student}
          value={ props.interview.interviewer.id}
        />
      }
      
    </article>
  );
}