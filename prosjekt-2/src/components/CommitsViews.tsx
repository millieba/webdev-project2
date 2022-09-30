import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import CommitsOptions from './CommitsOptions';

interface Props {
    cleanedResults: Array<any>;
}


function CommitsViews({ cleanedResults }: Props) {
    const [view, setView] = useState('');

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="select-views">Select view</InputLabel>
                <Select
                labelId="select-views"
                value={view}
                label={"Select view"}
                onChange={(e)=>{
                    setView(e?.target.value);
                }}
                >
                <MenuItem value={"pie-chart"}>Pie chart</MenuItem>
                <MenuItem value={"commits"}>Commits</MenuItem>
                </Select>
            </FormControl>

            {view === "commits" ? <CommitsOptions cleanedResults={cleanedResults} /> : <></>}
            {view === "pie-chart" ? <p>Nothing...</p> : <></>}
        </div>
    );
}

export default CommitsViews;