import React, { useState } from "react"
import Button from "components/Button";
import InterviewerList from "components/InterviewerList.jsx";


export default function Form(props) {

  console.log(props);
  const [name,setName] = useState(props.value || null)
  const [interviewer, setInterviewer] = useState(props.value || null);
  
  //Add a reset() function to the Form component that calls setName("") and setInterviewer(null).
  const reset = function () {
    setName('');
    setInterviewer(null) ;
  };

  //Add a cancel function to the Form component that calls reset() and props.onCancel. We should also update our Form component so it's called when a user clicks the Cancel button.
  const cancel = function() {
    reset();
    props.onCancel();
  };


  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange = {event => setName(event.target.value)} //grabbing value from the input area
        value={name}
        data-testid="student-name-input"
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={props.onCancel}>Cancel</Button>
      <Button confirm onClick={props.onSave}>Save</Button>
    </section>
  </section>
</main>
  ) ;
}