import TextField from '@mui/material/TextField';
import { Button, IconButton, InputAdornment, Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Modal from '@mui/material/Modal';
import ProjectIdImage from '../images/project-id.png';
import CloseIcon from '@mui/icons-material/Close';
import Connect from '../api/Connect';
import ThemeContext from '../contexts/ThemeContext';

const styleModal = {
  top: '50%',
  left: '50%',
  width: '50vw',
  height: 'auto',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#ffffff',
  boxShadow: 20,
  p: 4,
  overflow: 'auto',
};




function SendLink() {

  const [{theme}] = useContext(ThemeContext)

  const [disableButton, setDisableButton] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // To avoid sending new variables all the time to the API useeffect dependencies
  const [tempAccessToken, setTempAccessToken] = useState<string>();
  const [tempProjectId, setTempProjectId] = useState<string>();

  // The variables we pass as props to the API <Connect />
  const [accessToken, setAccessToken] = useState<string>();
  const [projectId, setProjectId] = useState<string>();

  useEffect(() => {
    if (tempAccessToken && tempProjectId && validateInputFields(tempAccessToken, tempProjectId)) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [tempAccessToken, tempProjectId]);

  function clearStates() {
    if (accessToken && projectId) {
      setAccessToken(undefined);
      setProjectId(undefined);
    } 
  }


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
          style={{color: theme.textcolor}}
          id="send-link-field"
          variant='outlined'
          label="GitLab repo project id"
          size="small"
          onChange={(e) => {
            setTempProjectId(e.target.value);
            clearStates();
          }}
          sx={{ mt: "15px", width: "250px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton style={{color: theme.textcolor}}
                  onClick={handleOpen}>
                  <HelpOutlineIcon />
                </IconButton>
              </InputAdornment>
            ),
          }} />

        <br />

        <TextField
          id="access-token-field"
          variant='outlined'
          label="Access token"
          size="small"
          onChange={(e) => {
            setTempAccessToken(e.target.value);
            clearStates();
          }}
          sx={{ mt: "15px", width: "250px" }} />

        <br />

        <Button 
          style={{backgroundColor: theme.buttonColor}}
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
        <Connect accessToken={accessToken} projectId={projectId} /> :
        <></>}

      <Modal
        open={open}
        onClose={handleClose}>
        <Box sx={styleModal}>
          <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
          </Box>
          <h2>What is Gitlab repository project-id?</h2>
          <p>Your project's id can be found by going to the homepage of your Gitlab repository. In the picture below an example is highlighted with lilac.</p>
          <Box component='img' src={ProjectIdImage} id="projectIdImage" sx={{ maxHeight: "100%", maxWidth: "100%" }} />
        </Box>
      </Modal>
    </div>

  );
}

export default SendLink;
