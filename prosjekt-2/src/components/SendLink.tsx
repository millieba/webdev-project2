import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Connect from '../api/Connect';

interface Props {
  userPick: string;
  displayValue: string;
  header: string;
}

function SendLink({ userPick, displayValue, header }: Props) {

  const [disableButton, setDisableButton] = useState(true);

  // To avoid sending new variables all the time to the API useeffect dependencies
  const [tempAccessToken, setTempAccessToken] = useState<string>();
  const [tempProjectId, setTempProjectId] = useState<string>();

  // The variables we pass as props to the API <Connect />
  const [accessToken, setAccessToken] = useState<string>();
  const [projectId, setProjectId] = useState<string>();

  useEffect(() => {
    if (tempAccessToken && tempProjectId && validateInputFields(tempAccessToken,tempProjectId)) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [tempAccessToken, tempProjectId]);

  function validateInputFields(accessToken: string, projectId: string) {
    if (projectId == null || !projectId.match(/\d+/))
      return false;
    if (accessToken == null || !accessToken.match(/[\w-+~.=/]+/))
      return false;

    return true;
  }

  return (
    // To adjust the colors on the MUI-components, use theme in index.tsx
    <div>
      <Box>
        <TextField
          id="send-link-field"
          variant='outlined'
          label="GitLab repo project id"
          size="small"
          onChange={(e) => {
            setTempProjectId(e.target.value);
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
            setProjectId(tempProjectId);
          }}
          disabled={disableButton}
          sx={{ mt: "15px" }}>
          Submit
        </Button>
      </Box>
      {accessToken !== undefined && projectId !== undefined && validateInputFields(accessToken, projectId) ?
        <Connect accessToken={accessToken} projectId={projectId} userPick={userPick} displayValue={displayValue} header={header} /> :
        <></>}

      {/* <p>{userPick}</p> */}
    </div>
  );
}

export default SendLink;
