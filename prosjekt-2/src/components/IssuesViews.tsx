import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import IssuesFilter from './IssuesFilter';
import IssuesPieChart from '../charts/IssueStateChart';
import IssueAssigneeChart from '../charts/IssueAssigneeChart';
import { IIssue } from "../api/GetIssues";

interface Props {
    cleanedResults: Array<IIssue>;
}
function IssuesViews({ cleanedResults }: Props) {
    const [view, setView] = useState("list");
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="select-views">Select view</InputLabel>
                <Select
                    labelId="select-views"
                    value={view}
                    label={"Select view"}
                    onChange={(e) => {
                        setView(e?.target.value);
                    }}
                >
                    <MenuItem value={"list"}>List view</MenuItem>
                    <MenuItem value={"charts"}>Charts</MenuItem>
                </Select>
            </FormControl>
            {view === "list" ? <IssuesFilter cleanedResults={cleanedResults} /> : <></>}
            {view === "charts" ?
                <>
                    <h3>Distribution of issues on state (open/closed)</h3>
                    <IssuesPieChart cleanedResults={cleanedResults} />

                    <h3>Issues per assignee</h3>
                    <IssueAssigneeChart cleanedResults={cleanedResults} />
                </>
                : <></>}
        </div>
    );
}
export default IssuesViews;