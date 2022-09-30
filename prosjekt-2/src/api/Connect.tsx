import { Box, Grid } from "@mui/material";
import GetCommits from "./GetCommits";
import GetIssues from "./GetIssues";


interface Props {
    accessToken: string;
    projectId: string;
}

function Connect({ accessToken, projectId }: Props) {
    return (
        <Box sx={{ mt: "20px"}}>
            <Grid container justifyContent="center" alignItems="flex-start">
                <Grid item xs={12} md={5.5} className="gridViewItem" sx={{ m: "10px", p: "10px"}}>
                    <GetCommits accessToken={accessToken} projectId={projectId} />
                </Grid>
                <Grid item xs={12} md={5.5} className="gridViewItem" sx={{ m: "10px", p: "10px"}}>
                    <GetIssues accessToken={accessToken} projectId={projectId} />
                </Grid >
            </Grid>
        </Box>
    );
}
export default Connect;