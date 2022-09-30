import { Box, Grid } from "@mui/material";
import Commits from "../components/Commits";
import Issues from "../components/Issues";


interface Props {
    accessToken: string;
    projectId: string;
}

function Connect({ accessToken, projectId }: Props) {
    return (
        <Box sx={{ mt: "20px"}}>
            <Grid container justifyContent="center" alignItems="flex-start">
                <Grid item xs={12} md={5.5} className="gridViewItem" sx={{ m: "10px", p: "10px"}}>
                    <Commits accessToken={accessToken} projectId={projectId} />
                </Grid>
                <Grid item xs={12} md={5.5} className="gridViewItem" sx={{ m: "10px", p: "10px"}}>
                    <Issues accessToken={accessToken} projectId={projectId} />
                </Grid >
            </Grid>
        </Box>
    );
}
export default Connect;