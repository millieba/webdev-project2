import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { gitlabRepoState, accessTokenState } from '../states/states';

function SendLink() {

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [gitLabRepoLink, setGitLabRepoLink] = useRecoilState(gitlabRepoState);

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
              setGitLabRepoLink(e.target.value);
            }}
            sx={{ mt: "15px" }} />
          <br />
          <TextField 
            id="access-token-field" 
            variant='outlined' 
            label="Access token" 
            size="small" 
            onChange={(e) => {
              setAccessToken(e.target.value);
            }}
            sx={{ mt: "15px" }} />
          <br />
          <Button 
            id="access-token" 
            variant="contained" 
            onClick={() => {
              console.log(gitLabRepoLink);
              console.log(accessToken);
            }}
            sx={{ mt: "15px" }}>
            Submit
          </Button>
        </Box>
      </div>
  );
}

export default SendLink;
