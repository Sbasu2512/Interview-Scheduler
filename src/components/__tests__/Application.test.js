import React from "react";

import { render, cleanup, waitForElement, fireEvent,  prettyDOM, getByText, getAllByTestId, getByPlaceholderText, getByAltText, queryByText  } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

/**const fixtures = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": {
      id: 2,
      time: "1pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Leopold Silvers", interviewer: 4 }
    },
    "4": { id: 4, time: "3pm", interview: null }
  },
  interviewers: {
    "1": {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png"
    },
    "4": {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg"
    }
  }
}; */

describe("Test suite for Application component", () => {
  it("defaults to Monday upon loading", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"));
  });

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", 
   /**
    * */
   async () => {
     //1: Render the Application.
     const { container, debug } = render(<Application />);
     //  2: Wait until the text "Archie Cohen" is displayed.
     await waitForElement(() => getByText(container ,"Archie Cohen"));
     
     const appointments = getAllByTestId(container, "appointment");

     const appointment = getAllByTestId(container, "appointment")[0];

    
     //  3: Click the "Add" button on the first empty appointment.
     fireEvent.click(getByAltText(appointment, "Add"));
     //  4: Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
     fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
       target: { value: "Lydia Miller-Jones" }
      });
      // 5: Click the first interviewer in the list.
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      // 6: Click the "Save" button on that same appointment.
      fireEvent.click(getByText(appointment, "Save"));
      //
      expect(getByText(appointment, "Saving")).toBeInTheDocument();
      // 7: Check that the element with the text "Saving" is displayed.
      expect(getByText(appointment, "Saving")).toBeInTheDocument();
      // 8: Wait until the element with the text "Lydia Miller-Jones" is displayed.
      await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
      //check if we are displaying student name right after saving
      expect((getByText(appointment, "Lydia Miller-Jones"))).toBeInTheDocument() ;
      // 9: Check that the DayListItem with the text "Monday" also has the text "no spots remaining". 
      expect(getByText(container, "Monday")).toBeInTheDocument();
      expect(getByText(container, "no spots remaining")).toBeInTheDocument();

      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
      expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    });
    
  });
  
