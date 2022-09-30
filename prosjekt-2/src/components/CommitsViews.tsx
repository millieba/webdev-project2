import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import CommitsFilter from './CommitsFilter';
import CommitsChart from '../charts/CommitsChart';
import { ICommit } from "../api/GetCommits";
import CommitsBarChart from "../charts/CommitBarChart";

interface Props {
    cleanedResults: Array<ICommit>;
}


function CommitsViews({ cleanedResults }: Props) {
    const [view, setView] = useState("list");

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
                <MenuItem value={"list"}>List view</MenuItem>
                <MenuItem value={"pie-chart"}>Pie chart</MenuItem>
                <MenuItem value={"bar-chart"}>Bar chart</MenuItem>
                </Select>
            </FormControl>

            {view === "list" ? <CommitsFilter cleanedResults={cleanedResults} /> : <></>}
            {view === "pie-chart" ? <CommitsChart cleanedResults={cleanedResults} /> : <></>}
            {view === "bar-chart" ? <CommitsBarChart cleanedResults ={cleanedResults}/> : <></>}
        </div>
    );
}

export default CommitsViews;