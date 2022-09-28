import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

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
        if (!emptyList.includes(result.assignees)) {
            emptyList.push(result.assignees)
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
                {cleanedResults.map((result, i) => (
                    <div key={i}>
                        {result.assignees === name ? <div>
                            Title: {result.title} ///
                            Description: {result.description} ///
                            Assigneed to: {result.assignees} ///
                            State: {result.state} ///
                            Created at: {result.createdAt}<br /><br /></div> : <></>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default IssuesOptions;