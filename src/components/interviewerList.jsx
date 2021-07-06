import React from "react";
import interviewListItem from "./interviewerListItem";

export default function interviewerList(props) {
  console.log(props);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );

}