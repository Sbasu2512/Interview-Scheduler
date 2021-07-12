import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders the form", () => {
    render(<Form />)
  })

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {

    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} name= "name" />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
      /* 1. Create the mock onSave function */

      
      const onSave = jest.fn();
      const { getByText, getByPlaceholderText, queryByText } = render(
        /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
        <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={onSave}
        onCancel={jest.fn()}
        />
        );
        
        fireEvent.change(getByPlaceholderText('Enter Student Name'), {
          target: { value: 'Lydia Miller-Jones' },
        });
        
    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));

    /* 3. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    /* 4. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);
  
    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});