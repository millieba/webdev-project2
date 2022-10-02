import {render, screen} from '@testing-library/react'
import Commits from '../components/Commits';


test("See that commits show up", () => {
    render(<Commits accessToken={''} projectId={''}/>) 
    
});