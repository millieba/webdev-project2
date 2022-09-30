import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext, useState } from 'react';
import { Checkbox, Grid, ListItemText, OutlinedInput } from '@mui/material';
import ThemeContext from '../contexts/ThemeContext';
import { IIssue } from '../api/GetIssues';

interface Props {
    cleanedResults: Array<IIssue>;
}

// Styles the size of the input filter forms
export const styleEachForm = {
    mt: '10px', 
    width: '40vw', 
    ml: '10px'
}

function IssuesFilter({ cleanedResults }: Props) {
    const [{theme}] = useContext(ThemeContext);
    const [chosenNames, setNames] = useState<string[]>([]); // Names chosen in dropwdown menu
    const [chosenStates, setChosenState] = useState<string[]>([]); // States chosen in dropdown menu

    // Styling of each issue box
    const styleEachIssue = {
        p: '10px', 
        backgroundColor: theme.boxColor2, 
        m: '10px', 
        borderRadius: "10px", 
        borderWidth: "10px" 
    }

    // Style each option/filter
    const styleEachOption = {
        color: theme.textcolor,
        input: {
            color: theme.textcolor
        },
        select : {
            '&:before': {
                borderColor: theme.inputTextColor
            },
            '&:after': {
                borderColor: theme.inputTextColor
            }
        },
    }

    let states = ["Open", "Closed"]; // The possible states for the "filter on state" dropwdown menu

    let names = new Array<string>(); // Array for all unique names (assignee names) 
    cleanedResults.map((result) => {
        if (!names.includes(result.assignees)) { // Put only unique names in names array to avoid displaying duplicate names in dropdown
            names.push(result.assignees);
        }
    });

    // handleChosenNameChange and handleChosenStatesChange is based on https://codesandbox.io/s/urnvxd?file=/demo.tsx:1221-1940
    const handleChosenNameChange = (event: SelectChangeEvent<typeof chosenNames>) => {
        const {
            target: { value },
        } = event;

        setNames(
            typeof value === 'string' ? value.split(",") : value, // On autofill we get a stringified value.
        );
        filterOnChoices(chosenNames, chosenStates);
    }

    const handleChosenStatesChange = (event: SelectChangeEvent<typeof chosenStates>) => {
        const {
            target: { value },
        } = event;
        setChosenState(
            typeof value === 'string' ? value.split(",") : value, // On autofill we get a stringified value.
        );
        filterOnChoices(chosenNames, chosenStates);
    }

    function filterOnChoices(chosenNames: Array<string>, chosenStates: Array<string>) {
        if (chosenStates.length === 0 && chosenNames.length === 0) { // If no filters applied
            return cleanedResults;
        }
        else if (chosenStates.length === 0) { // If only filter on name chosen
            return cleanedResults.filter(result => chosenNames.includes(result.assignees));
        }
        else if (chosenNames.length === 0) { // If only filter on state chosen
            return cleanedResults.filter(result => chosenStates.includes(result.state));
        }
        else { // Filter on both name and state
            let filteredResults = cleanedResults.filter(result => chosenNames.includes(result.assignees)); // Filter first on name
            return filteredResults.filter(result => chosenStates.includes(result.state)); // then filter on state
        }
    }


    return (
        <div>
            {/* Inspiration from https://codesandbox.io/s/urnvxd?file=/demo.tsx:1221-1940 */}
            <FormControl sx={styleEachForm}>
                <InputLabel id="checkbox-dropdown" sx={styleEachOption}>Select names</InputLabel>
                <Select
                    labelId="checkbox-dropdown"
                    id="select-multiple-dropdown"
                    multiple
                    value={chosenNames}
                    onChange={handleChosenNameChange}
                    input={<OutlinedInput label="Select names" />}
                    renderValue={(selected) => selected.join(', ')}
                    sx={{ color: theme.inputTextColor }}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={chosenNames.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={styleEachForm}>
                <InputLabel id="checkbox-dropdown" sx={styleEachOption}>Select states</InputLabel>
                <Select
                    labelId="checkbox-dropdown"
                    id="select-multiple-dropdown"
                    multiple
                    value={chosenStates}
                    onChange={handleChosenStatesChange}
                    input={<OutlinedInput label="Select states" />}
                    renderValue={(selected) => selected.join(', ')}
                    sx={{ color: theme.textcolor}}
                >
                    {states.map((state) => (
                        <MenuItem key={state} value={state}>
                            <Checkbox checked={chosenStates.indexOf(state) > -1} />
                            <ListItemText primary={state} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


            {filterOnChoices(chosenNames, chosenStates).map((res) => (
                <Grid sx={styleEachIssue}>
                    <Grid><b>Title:</b> {res.title}</Grid>
                    <Grid><b>Description:</b> {res.description}</Grid>
                    <Grid><b>Assigned to:</b> {res.assignees}</Grid>
                    <Grid><b>State:</b> {res.state}</Grid>
                    <Grid><b>Created on:</b> {res.createdAt}</Grid>
                </Grid>
            ))}
        </div>
    );
}

export default IssuesFilter;