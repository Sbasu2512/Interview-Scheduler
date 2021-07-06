// package imports 
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

//local imports
import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from 'components/daylist';
import InterviewerListItem from 'components/interviewerListItem';
import interviewerList from "components/interviewerList";

//styles
import "index.scss";

//button.js
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>) //children
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));
//daylistitem.js
  storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  // Provides the default background color for our component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) 
  // To define our stories, we call add() once for each of our test states to generate a story
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) 
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  // action() allows us to create a callback that appears in the actions panel when clicked
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> 
  ));
//daylist.js
  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];
  
  storiesOf("DayList", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
    })
    .add("Monday", () => (
      <DayList days={days} day={"Monday"} setDay={action("setDay")} />
    ))
    .add("Tuesday", () => (
      <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
    ));

    const interviewer = {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    };
    //module == storybook library
    storiesOf("InterviewerListItem", module)

      .addParameters({
        backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
      })
      //giving it a state
      .add("Unselected", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
        />
      ))
      .add("Selected", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected
        />
      ))
      .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={ (event)=>  action("setInterviewer") (interviewer.id)}
    />
  )); 