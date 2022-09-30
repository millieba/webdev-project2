import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useContext, useState } from "react";
import CommitsFilter from './CommitsFilter';
import CommitsChart from '../charts/CommitsChart';
import ThemeContext from "../contexts/ThemeContext";

interface Props {
    cleanedResults: Array<any>;
}

export const styleEachView = {
    mt: '10px',
}


function CommitsViews({ cleanedResults }: Props) {
    const [view, setView] = useState("list");
    const [{theme}] = useContext(ThemeContext);

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
                onChange={(e)=>{
                    setView(e?.target.value);
                }}
                sx={inputStyling}
                >
                <MenuItem value={"list"}>List view</MenuItem>
                <MenuItem value={"pie-chart"}>Pie chart</MenuItem>
                </Select>
            </FormControl>

            {view === "list" ? <CommitsFilter cleanedResults={cleanedResults} /> : <></>}
            {view === "pie-chart" ? <CommitsChart cleanedResults={cleanedResults} /> : <></>}
        </div>
    );
}

export default CommitsViews;