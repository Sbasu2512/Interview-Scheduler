import React, { useState, useEffect } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList.jsx";

export default function Form(props) {
  //states
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.value || null);
  const [error, setError] = useState("");

  //Create a function called validate in the body of the Form component.
  function validate() {
    if (!name) {
      setError("student name cannot be blank");
      return;
    }
    setError("");
    save();
  }
  //Add a reset() function to the Form component that calls setName("") and setInterviewer(null).
  const reset = function () {
    setName("");
    setInterviewer(null);
  };

  //Add a cancel function to the Form component that calls reset() and props.onCancel. We should also update our Form component so it's called when a user clicks the Cancel button.
  const cancel = function () {
    reset();
    props.onCancel();
  };

  const save = function () {
    props.onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
