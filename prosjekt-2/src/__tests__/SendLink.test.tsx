import { getByTestId, render, screen } from "@testing-library/react";
import SendLink from "../components/SendLink";

test("test that submit-button is disabled", () => {
    render(<SendLink/>); 

    const button = screen.getByTitle("access-token");  
    expect(button).toHaveAttribute('disabled'); 
})