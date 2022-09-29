import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { Checkbox, Grid, ListItemText, OutlinedInput } from '@mui/material';

interface Props {
    cleanedResults: Array<any>;
}


function IssuesOptions({ cleanedResults }: Props) {
    // Names chosen in dropwdown menu:
    const [chosenNames, setPersonName] = useState<string[]>([]);

    // Array for the filtered version of cleanedResults
    let filteredResults:  { title: string; description: string; assignees: string; state: string; createdAt: string; }[] = [];
    
    // handleChange is taken from https://codesandbox.io/s/urnvxd?file=/demo.tsx:1221-1940
    const handleChange = (event: SelectChangeEvent<typeof chosenNames>) => {
        const {
          target: { value },
        } = event;
        console.log(value);
        console.log(typeof value);
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(",") : value,
        );
      };

    // Array for all unique names (assignee names) 
    let names = new Array<string>();

    // Put only unique names in names array to avoid displaying duplicate names in dropdown
    cleanedResults.map((result, i) => {
        if (!names.includes(result.assignees)) {
            names.push(result.assignees);
        }
    });

    console.log(names);
    console.log(chosenNames);

    // where the filtering happens
    chosenNames.map((name, j) => {
        cleanedResults.map((result, i) => {
            if (result.assignees === name) {
                let assignees = result.assignees;
                let createdAt = result.createdAt;
                let title = result.title;
                let description = result.description;
                let state = result.state;
                filteredResults.push({title: title, description: description, createdAt: createdAt, assignees: assignees, state: state });
            }
        })
    })

    let filteredResultsByDate = filteredResults.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

    console.log(filteredResultsByDate);


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
                    onChange={handleChange}
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


                {filteredResultsByDate.map((res, i) => (
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