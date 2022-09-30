import SendLink from '../components/SendLink'
import {render, screen} from '@testing-library/react'; 

test("tests that 'issues' exist in the document", () => {
    render(<SendLink/>)
    expect(screen.getByText("Issues")).toBeInTheDocument(); 
}); 
