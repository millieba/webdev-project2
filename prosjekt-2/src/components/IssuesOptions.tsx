import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { Checkbox, Grid, ListItemText, OutlinedInput } from '@mui/material';

interface Props {
    cleanedResults: Array<any>;
}

function IssuesOptions({ cleanedResults }: Props) {
    const [chosenNames, setNames] = useState<string[]>([]); // Names chosen in dropwdown menu:
    const [chosenStates, setChosenState] = useState<string[]>([]); // States chosen in dropdown menu:

    let states = ["opened", "closed"]; // The possible states for the "filter on state" dropwdown menu

    let names = new Array<string>(); // Array for all unique names (assignee names) 
    cleanedResults.map((result, i) => {
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
    };

    const handleChosenStatesChange = (event: SelectChangeEvent<typeof chosenStates>) => {
        const {
            target: { value },
        } = event;
        setChosenState(
            typeof value === 'string' ? value.split(",") : value, // On autofill we get a stringified value.
        );
        filterOnChoices(chosenNames, chosenStates);
    };

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
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="checkbox-dropdown">Select names</InputLabel>
                <Select
                    labelId="checkbox-dropdown"
                    id="select-multiple-dropdown"
                    multiple
                    value={chosenNames}
                    onChange={handleChosenNameChange}
                    input={<OutlinedInput label="Select names" />}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={chosenNames.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="checkbox-dropdown">Select states</InputLabel>
                <Select
                    labelId="checkbox-dropdown"
                    id="select-multiple-dropdown"
                    multiple
                    value={chosenStates}
                    onChange={handleChosenStatesChange}
                    input={<OutlinedInput label="Filter on opened/closed" />}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {states.map((state) => (
                        <MenuItem key={state} value={state}>
                            <Checkbox checked={chosenStates.indexOf(state) > -1} />
                            <ListItemText primary={state} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


            {filterOnChoices(chosenNames, chosenStates).map((res, i) => (
                <Grid key={i} container direction="column" justifyContent="flex-start" alignItems="center" sx={{ m: '5px', backgroundColor: '#9dbbae', borderRadius: "10px", p: "5px" }}>
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

export default IssuesOptions;