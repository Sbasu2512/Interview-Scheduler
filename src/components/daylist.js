import React from 'react';
import DayListItem from "./DayListItem";


export default function DayList(props) {
console.log(props);
  const dayListItems = (props.days).map((dayData, _index) =>
    <DayListItem
      key={dayData.id}
      name={dayData.name}
      spots={dayData.spots}
      selected={props.selected === dayData.id}
      setDay={props.setDay}
    />
  );

  return (
    <ul>{dayListItems}</ul>
  );

}