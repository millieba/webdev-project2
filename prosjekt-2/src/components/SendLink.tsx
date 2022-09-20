import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


function SendLink() {

  
  return (
    // To adjust the colors on the MUI-components, use theme in index.tsx
      <div>
        <Box>
          <TextField id="send-link-field" variant='outlined' label="GitLab repo" size="small" sx={{ mt: "15px" }} />
          <br />
          <TextField id="access-token-field" variant='outlined' label="Access token" size="small" sx={{ mt: "15px" }} />
          <br />
          <Button id="access-token" variant="contained" sx={{ mt: "15px" }}>
            Submit
          </Button>
        </Box>
      </div>
  );
}

export default SendLink;
