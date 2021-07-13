import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByPlaceholderText, getByAltText, queryByText  } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

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
   async () => {
     //1: Render the Application.
     const { container } = render(<Application />);
     //  2: Wait until the text "Archie Cohen" is displayed.
     await waitForElement(() => getByText(container ,"Archie Cohen"));
     
    //  const appointments = getAllByTestId(container, "appointment");

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
  
