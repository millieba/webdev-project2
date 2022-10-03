import { render, screen } from '@testing-library/react'
import Headline from "../components/Headline"
import '@testing-library/jest-dom'

test("Is the headline visible", () => {
    render(<Headline />)
    const headline = screen.getByTestId('headline')
    expect(headline).toBeInTheDocument();
}); 