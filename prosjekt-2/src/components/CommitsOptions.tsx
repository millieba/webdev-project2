import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { Grid } from '@mui/material';

interface Props {
    cleanedResults: Array<any>;
}

function IssuesOptions({ cleanedResults }: Props) {

    const [name, setName] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setName(event.target.value as string);
    };

    let emptyList = new Array<string>();

    cleanedResults.map((result, i) => {
        if (!emptyList.includes(result.committer)) {
            emptyList.push(result.committer);
        }
    });

    //console.log(emptyList);

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Filter on assignee name</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    onChange={handleChange}
                >

                    {emptyList.map((n, i) => (
                        <MenuItem value={n} key={i}>
                            {n}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div>

        Commits made by {name}
        {cleanedResults.map((result, i) => (
            <div key={i}>
                
                {result.committer === name  ? 
                <Grid container direction="column" justifyContent="flex-start" alignItems="center" sx={{ m: '5px', backgroundColor: '#9dbbae', borderRadius: "10px", p: "5px" }}>
                <Grid><b>Committer:</b> {result.committer}</Grid>
                <Grid><b>Message:</b> {result.commitMessage}</Grid>
                <Grid><b>Date committed:</b> {result.committedDate}</Grid>
                </Grid> : <></>}

            </div>
        ))}
            </div>
        </div>
    );
}

export default IssuesOptions;