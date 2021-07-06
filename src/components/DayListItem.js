import React from "react" ;
import "components/DayListItem.scss"

const className = require('classnames');

export default function DayListItem(props) {
  console.log(props);

  let listClass = className('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full" :props.spots 
    
  })

  return (
    <li onClick= {() => props.setDay(props.name)}>
      <h2 className="text--regualar"> {props.name} </h2>
      <h3 className="text--light"> {props.spots} </h3>
    </li>
  );
}