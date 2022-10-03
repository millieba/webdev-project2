import { Box, Grid } from "@mui/material";
import { useContext, useState } from "react";
import ThemeContext from "../contexts/ThemeContext";
import GetCommits from "./GetCommits";
import GetIssues from "./GetIssues";


interface Props {
    accessToken: string;
    projectId: string;
}

function Connect({ accessToken, projectId }: Props) {
    const {themes} = useContext(ThemeContext);
    const [isDarkMode] = useState(false); 
    const theme = isDarkMode ? themes.dark : themes.light;

    // Styling for the "Commits" and "Issues" view boxes
    const gridItemStyle = {
        m: "10px", 
        p: "10px", 
        backgroundColor: theme.boxColor, 
    }

    return (
        <Box sx={{ mt: "20px"}}>
            <Grid container justifyContent="center" alignItems="flex-start">
                <Grid item xs={12} md={5.5} className="gridViewItem" sx={gridItemStyle}>
                    <h3>Commits</h3>
                    <GetCommits accessToken={accessToken} projectId={projectId} />
                </Grid>
                <Grid item xs={12} md={5.5} className="gridViewItem" sx={gridItemStyle}>
                    <h3>Issues</h3>
                    <GetIssues accessToken={accessToken} projectId={projectId} />
                </Grid >
            </Grid>
        </Box>
    );
}
export default Connect;