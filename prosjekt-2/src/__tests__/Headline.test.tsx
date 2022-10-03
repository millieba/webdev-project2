import { render, screen } from '@testing-library/react'
import Headline from "../components/Headline"
import '@testing-library/jest-dom'

test("Changes on user input", () => {
    render(<Headline />)
    const headline = screen.getByTestId('headline')
    expect(headline).toBeInTheDocument();
}); 