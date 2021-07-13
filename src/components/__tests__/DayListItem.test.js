import React from "react";

import { render, cleanup } from "@testing-library/react";

import DayListItem from "components/DayListItem";

afterEach(cleanup);

describe('DayListItem.test.js', () => {
  it("renders without crashing", () => {
    render(<DayListItem />);
  });
  
  it("renders 'no spots remaining' when there are 0 spots", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={0} />);
    expect(getByText("no spots remaining")).toBeInTheDocument();
  });
  
  it("renders '1 spot remaining' when there is 1 spot", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={1} />);
    expect(getByText("1 spot remaining")).toBeInTheDocument();
  });
  
  it("renders '2 spots remaining' when there are 2 spots", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={2} />);
    expect(getByText("2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", () => {
    
  })
})



/**"loads data, cancels an interview and increases the spots remaining for Monday by 1"
"loads data, edits an interview and keeps the spots remaining for Monday the same"
"shows the save error when failing to save an appointment"
"shows the delete error when failing to delete an existing appointment"
 */