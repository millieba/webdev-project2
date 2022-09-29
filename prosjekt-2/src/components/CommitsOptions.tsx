import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { Checkbox, Grid, ListItemText, OutlinedInput } from '@mui/material';

interface Props {
    cleanedResults: Array<any>;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function CommitsOptions({ cleanedResults }: Props) {

    const [personName, setPersonName] = useState<string[]>([]);

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
            MenuProps={MenuProps}
            >
            {names.map((name) => (
                <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>

        {personName.map((committerName, j) => (
            <div key={j}>
            {cleanedResults.map((result, i) => (
            <div key={i}>
                
                {result.committer === committerName  ? 
                <Grid container direction="column" justifyContent="flex-start" alignItems="center" sx={{ m: '5px', backgroundColor: '#9dbbae', borderRadius: "10px", p: "5px" }}>
                <Grid><b>Committer:</b> {result.committer}</Grid>
                <Grid><b>Message:</b> {result.commitMessage}</Grid>
                <Grid><b>Date committed:</b> {result.committedDate}</Grid>
                </Grid> : <></>}

            </div>
            ))}

            </div>
        ))}
        
            </div>
    );
}

export default CommitsOptions;