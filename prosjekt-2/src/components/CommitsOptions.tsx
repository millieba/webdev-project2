import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { Checkbox, Grid, ListItemText, OutlinedInput, TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


interface Props {
    cleanedResults: Array<any>;
}



function CommitsOptions({ cleanedResults }: Props) {
    const [value, setValue] = useState<Dayjs | null>(null);
    // const [startDate, setStartDate] = useState<Dayjs | null >();
    // const [endDate, setEndDate] = useState<Dayjs | null>();
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
          typeof value === 'string' ? value.split(",") : value,
        );
      };

    let names = new Array<string>();

    cleanedResults.map((result, i) => {
        if (!names.includes(result.committer)) {
            names.push(result.committer);
        }
    });

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

    filteredResults.sort((a, b) => Date.parse(b.dateOfCommit) - Date.parse(a.dateOfCommit));

    // Testing av dato konvertering til dayjs
    // if (filteredResultsByDate.length > 0) {
    //     setStartDate(dayjs(filteredResultsByDate[1].dateOfCommit));
    //     setEndDate(dayjs(filteredResultsByDate[filteredResultsByDate.length-1].dateOfCommit));
    //     console.log(startDate);
    //     console.log(endDate);
    // }


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

                 {/* Kalender */}
                {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                    label="Start date"
                    value={value}
                    onChange={(newValue) => {
                    setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} 
                    sx={{ m: 1, width: 300 }}/>}
                />
                </LocalizationProvider> */}
               
                {filteredResults.map((res, i) => (
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