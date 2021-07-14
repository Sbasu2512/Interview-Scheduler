import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByPlaceholderText, getByAltText, queryByText, prettyDOM } from "@testing-library/react";

import DayListItem from "components/DayListItem";
import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("DayListItem.test.js", () => {
  /* test number one */
  it("renders without crashing", () => {
    render(<DayListItem />);
  });
  /* test number two */
  it("renders 'no spots remaining' when there are 0 spots", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={0} />);
    expect(getByText("no spots remaining")).toBeInTheDocument();
  });
  /* test number three */
  it("renders '1 spot remaining' when there is 1 spot", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={1} />);
    expect(getByText("1 spot remaining")).toBeInTheDocument();
  });
  /* test number four */
  it("renders '2 spots remaining' when there are 2 spots", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={2} />);
    expect(getByText("2 spots remaining")).toBeInTheDocument();
  });
  /* test number five */
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //  3. Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(container, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(container, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(container, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(container, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(container, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  /* test number six */
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    //1. Render the Application
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //  3. Click the "Edit" button on the booked appointment.
    fireEvent.click(getByAltText(container, "Edit"));
    //4. Check if the save button is shown.
    expect(getByText(container, "Save")).toBeInTheDocument();
    //5. Enter another name for the student
    fireEvent.change(getByPlaceholderText(container, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    //6. Wait until the element with "Add" button is displayed.
    await waitForElement(() => getByAltText(container, "Add"));
    //7. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining"
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  /* test number seven */
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    //1. Render the Application
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //  3. Click the "Add" button on the booked appointment.
    fireEvent.click(getByAltText(container, "Add"));
    //4. Add a student
    fireEvent.change(getByPlaceholderText(container, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    //5. Select an interviewer
    fireEvent.click(getByAltText(container, "Sylvia Palmer"));
    //6. click the save button
    fireEvent.click(getByText(container, "Save"));
    const errmsg = "Could not save appointment";
    await waitForElement(() => getByText(container, errmsg));
    //4. Look for text "Could not save appointment"
    expect(getByText(container, errmsg)).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    //1. Render the Application
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. click the delete button
    fireEvent.click(getByAltText(container, "Delete"));
    //4. waiting for confirm message
    await waitForElement(() => getByText(container, "Are you sure you would like to delete?"));
    //5. click the confirm button
    fireEvent.click(getByText(container, "Confirm"));
    //6. Wait for the Deleting mesage
    await waitForElement(() => getByText(container, "Deleting"))

    const errmsg = "Could not delete appointment";
    const err = getByText(container, errmsg);
    // console.log("err^^^", prettyDOM(err));
    expect(getByText(container, errmsg)).toBeInTheDocument();

  });

});