import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useContext, useState } from "react";
import IssuesFilter from './IssuesFilter';
import IssuesPieChart from '../charts/IssueStateChart';
import IssueAssigneeChart from '../charts/IssueAssigneeChart';
import ThemeContext from "../contexts/ThemeContext";
import {styleEachView} from "./CommitsViews";
import { IIssue } from "../api/GetIssues";

interface Props {
    cleanedResults: Array<IIssue>;
}
function IssuesViews({ cleanedResults }: Props) {
    const [{theme}] = useContext(ThemeContext);
    const [view, setView] = useState("list");

    // Styling of the dropdown
    const inputStyling = {
        color: theme.textcolor,
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor:  theme.textcolor + " !important",
        },
        '& .MuiSvgIcon-root': {
            color: theme.textcolor + " !important",
        },
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
                    <IssuesPieChart cleanedResults={cleanedResults} />
                    <IssueAssigneeChart cleanedResults={cleanedResults} />
                    </>
                : <></>}
        </div>
    );
}
export default IssuesViews;