
import React from "react";
import InterviewerListItem from "./InterviewerListItem";

export default function interviewerList(props) {
  console.log(props);

  /****<DayListItem
      key={dayData.id}
      name={dayData.name}
      spots={dayData.spots}
      selected={props.selectedDay === dayData.id}
      setDay={(_event) => props.setDay(dayData.id)}
    /> */

  

  const Interviewers = 
  Array.isArray(props.interviewer) && 
  props.interviewers.map((data, index) => {
    return (<InterviewerListItem
      key={data.id}
      name = {data.name}
      avatar = {data.avatar}
      selected = {Interviewers.id === props.value}
      setInterviewer={event => props.onChange(data.id)}
    />) ;
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{Interviewers}</ul>
    </section>
  );
  // return (
  //   <ul>{InterviewerListItems}</ul>
  // );

}