import React from "react" ;

const className = require('classnames');

export default function DayListItem(props) {
  console.log(props);

  return (
    <li onClick= {() => props.setDay(props.name)}>
      <h2 className="text--regualar"> {props.name} </h2>
      <h3 className="text--light"> {props.spots} </h3>
    </li>
  );
}