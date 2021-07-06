import React from "react";
import classNames from "classnames";
import "components/interviewerListItem.scss"


export default function interviewListItem(props) {
  // console.log(props);
  // console.log(props.avatar);
  // console.log(props.name);

  

  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected" : props.selected,
  })



  return (
    <li 
      id = {props.id}
      className =  {interviewerClass}
      onClick =  {props.setInterviewer}      
    >
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    { props.selected &&  props.name} 
    
    </li>
  );


}