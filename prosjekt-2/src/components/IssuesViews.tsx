import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useState } from "react";
import IssuesFilter from './IssuesFilter';
import IssuesPieChart from '../charts/IssueStateChart';
import IssueAssigneeChart from '../charts/IssueAssigneeChart';
import {ThemeContext} from "../contexts/ThemeContext";
import {styleEachView} from "./CommitsViews";
import { IIssue } from "../api/GetIssues";

interface Props {
    cleanedResults: Array<IIssue>;
}
function IssuesViews({ cleanedResults }: Props) {
    const {themes} = useContext(ThemeContext);
    const [view, setView] = useState("list");
    const [isDarkMode] = useState(false); 
    const theme = isDarkMode ? themes.dark : themes.light;

    // Styling of the input
    const inputStyling = {
        color: theme.textcolor, 
    }

    return (
        <div>
            <FormControl fullWidth sx={styleEachView}>
                <InputLabel id="select-views" sx={inputStyling}>Select view</InputLabel>
                <Select
                    labelId="select-views"
                    value={view}
                    label={"Select view"}
                    onChange={(e) => {
                        setView(e?.target.value);
                    }}
                    sx={inputStyling}
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