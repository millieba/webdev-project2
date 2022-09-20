import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


function SendLink() {
  return (
    // To adjust the colors on the MUI-components, use theme in index.tsx
      <div>
        <Box sx={{ mt: "15px" }}>
          <TextField id="send-link" variant='outlined' label="GitLab repo" size="small" />
          <Button variant="contained">
            Submit
          </Button>
        </Box>
      </div>
  );
}

export default SendLink;
