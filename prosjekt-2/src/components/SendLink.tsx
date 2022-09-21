import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { gitlabRepoState, accessTokenState } from '../states/states';
import { useState } from 'react';

function SendLink() {

  // To avoid sending new variables all the time to the API
  const [tempAccessToken, setTempAccessToken] = useState("0");
  const [tempGitlabRepoLink, setTempGitlabRepoLink] = useState("0");

  // Variables being "sent" to the API
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [gitlabRepoLink, setGitlabRepoLink] = useRecoilState(gitlabRepoState);

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
              console.log(accessToken);
              console.log(gitlabRepoLink);
            }}
            sx={{ mt: "15px" }}>
            Submit
          </Button>
        </Box>
      </div>
  );
}

export default SendLink;
