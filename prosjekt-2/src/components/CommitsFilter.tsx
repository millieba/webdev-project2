import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext, useState } from 'react';
import { Checkbox, Grid, ListItemText, OutlinedInput, Pagination } from '@mui/material';
import ThemeContext from '../contexts/ThemeContext';
import { styleEachForm } from './IssuesFilter';
import { ICommit } from '../api/GetCommits';
import PaginationFunctions from './PaginationFunctions';
import { Box } from '@mui/system';


interface Props {
    cleanedResults: Array<ICommit>;
}

function CommitsFilter({ cleanedResults }: Props) {
    const [{ theme }] = useContext(ThemeContext);
    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    const [onPage, setOnPage] = useState(1);
    const elementsPerPage = 5;
    const numberOfPages = Math.ceil(filterOnName(selectedNames).length / elementsPerPage);
    const dataPage = PaginationFunctions(filterOnName(selectedNames), elementsPerPage);

    // CODE FOR PAGINATION
    const handlePagination = (e: any, p: number) => {
        dataPage.jump(p);
        setOnPage(p);
    }

    // CODE FOR FILTERING
    let uniqueNames = new Array<string>();

    // Styles each "commit" box of message, committer, and date
    const styleEachCommit = {
        p: '10px',
        backgroundColor: theme.boxColor2,
        m: '10px',
        borderRadius: "10px",
        borderWidth: "10px"
    }

    // Styles the name filtering
    const styleEachOption = {
        color: theme.textcolor,
        input: {
            color: theme.textcolor
        },
    }

    // handleChange inspired by https://codesandbox.io/s/urnvxd?file=/demo.tsx:1221-1940
    const handleChange = (event: SelectChangeEvent<typeof selectedNames>) => {
        const {
            target: { value },
        } = event;

        setSelectedNames(
            typeof value === 'string' ? value.split(",") : value,
        );

        filterOnName(selectedNames);
        handlePagination(event, 1); // always jump to the first page when selected person changes
    };


    // Find all unique members of a repository
    cleanedResults.map((result, i) => {
        if (!uniqueNames.includes(result.committer)) {
            uniqueNames.push(result.committer);
        }
    });

    // Filter based on what user has selected 
    function filterOnName(chosenNames: Array<string>) {
        if (chosenNames.length === 0) {
            return cleanedResults;
        } else {
            return cleanedResults.filter(result => chosenNames.includes(result.committer));
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
                    value={selectedNames}
                    onChange={handleChange}
                    input={<OutlinedInput label="Select names" />}
                    renderValue={(selected) => selected.join(', ')}
                    sx={styleEachOption}
                >
                    {uniqueNames.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={selectedNames.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box sx={{ p: 2 }}>

                {dataPage.dataDisplaying().map((res: any, i: number) => (
                    <Grid key={i} sx={styleEachCommit}>
                        <Grid><b>Committer:</b> {res.committer}</Grid>
                        <Grid><b>Commit message:</b> {res.commitMessage}</Grid>
                        <Grid><b>Committed date:</b> {res.committedDate}</Grid>
                    </Grid>
                ))}
                <Pagination
                    count={numberOfPages}
                    size="large"
                    variant='outlined'
                    page={onPage}
                    onChange={handlePagination}
                    className="pagination"
                />
            </Box>
        </div>
    );
}

export default CommitsFilter;