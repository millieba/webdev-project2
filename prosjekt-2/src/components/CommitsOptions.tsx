import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { Checkbox, Grid, ListItemText, OutlinedInput } from '@mui/material';

interface Props {
    cleanedResults: Array<any>;
}



function CommitsOptions({ cleanedResults }: Props) {

    const [personName, setPersonName] = useState<string[]>([]);
    let filteredResults: {committerName: string; dateOfCommit: string; commitMessage: string; }[] = [];
    
    // handleChange is taken from https://codesandbox.io/s/urnvxd?file=/demo.tsx:1221-1940
    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
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

    let names = new Array<string>();

    cleanedResults.map((result, i) => {
        if (!names.includes(result.committer)) {
            names.push(result.committer);
        }
    });

    console.log(names);
    console.log(personName);

    personName.map((committerName, j) => {
        cleanedResults.map((result, i) => {
            if (result.committer === committerName) {
                let committerName = result.committer;
                let dateOfCommit = result.committedDate;
                let commitMessage = result.commitMessage;
                filteredResults.push({ committerName: committerName, dateOfCommit: dateOfCommit, commitMessage: commitMessage });
            }
        })
    })

    let filteredResultsByDate = filteredResults.sort((a, b) => Date.parse(b.dateOfCommit) - Date.parse(a.dateOfCommit));

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
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Select names" />}
                    renderValue={(selected) => selected.join(', ')}
                    >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>


                {filteredResultsByDate.map((res, i) => (
                <Grid key={i} container direction="column" justifyContent="flex-start" alignItems="center" sx={{ m: '5px', backgroundColor: '#9dbbae', borderRadius: "10px", p: "5px" }}>
                    <Grid><b>Committer:</b> {res.committerName}</Grid>
                    <Grid><b>Commit message:</b> {res.commitMessage}</Grid>
                    <Grid><b>Committed date:</b> {res.dateOfCommit}</Grid>
                </Grid>
                ))}
            </div>
    );
}

export default CommitsOptions;