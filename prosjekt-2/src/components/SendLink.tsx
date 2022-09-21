import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import Connect from '../api/api';

function SendLink() {
  // To avoid sending new variables all the time to the API useeffect dependencies
  const [tempAccessToken, setTempAccessToken] = useState("0");
  const [tempGitlabRepoLink, setTempGitlabRepoLink] = useState("https://gitlab.stud.idi.ntnu.no/api/v4/projects/");

  // The variables we pass as props to the API <Connect />
  const [accessToken, setAccessToken] = useState("0");
  const [gitlabRepoLink, setGitlabRepoLink] = useState("https://gitlab.stud.idi.ntnu.no/api/v4/projects/");

  return (
    // To adjust the colors on the MUI-components, use theme in index.tsx
      <div>
        <Box>
          <TextField 
            id="send-link-field" 
            variant='outlined' 
            label="GitLab repo" 
            size="small"
            onChange={(e) => {
              setTempGitlabRepoLink(e.target.value);
            }}
            sx={{ mt: "15px" }} />
          <br />
          <TextField 
            id="access-token-field" 
            variant='outlined' 
            label="Access token" 
            size="small" 
            onChange={(e) => {
              setTempAccessToken(e.target.value);
            }}
            sx={{ mt: "15px" }} />
          <br />
          <Button 
            id="access-token" 
            variant="contained" 
            onClick={() => {
              setAccessToken(tempAccessToken);
              setGitlabRepoLink(tempGitlabRepoLink);
            }}
            sx={{ mt: "15px" }}>
            Submit
          </Button>
        </Box>
        <Connect accessToken={accessToken} gitlabRepoLink={gitlabRepoLink} />
      </div>
  );
}

export default SendLink;
