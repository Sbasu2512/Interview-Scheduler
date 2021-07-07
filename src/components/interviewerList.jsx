
import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

export default function interviewerList(props) {
  // console.log(props);
  
   const Interviewers = 
   Array.isArray(props.interviewers) && 
   props.interviewers.map(function(data, index) {
     return (<InterviewerListItem
      key={data.id}
      name = {data.name}
      avatar = {data.avatar}
      selected = {data.id === props.value}
      setInterviewer={event => props.onChange(data.id)}
      />) ;
    });
    
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{Interviewers}</ul>
    </section>
  );
  

}