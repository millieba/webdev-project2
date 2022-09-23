import TextField from '@mui/material/TextField';
import { Button, IconButton, InputAdornment, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Connect from '../api/api';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Modal from '@mui/material/Modal';
import ProjectIdImage from '../images/project-id.png';
import CloseIcon from '@mui/icons-material/Close';

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
    if (tempAccessToken && tempProjectId) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [tempAccessToken, tempProjectId]);


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
            sx={{ mt: "15px", width: "250px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleOpen}>
                    <HelpOutlineIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}/>
          <br />
          <TextField 
            id="access-token-field" 
            variant='outlined' 
            label="Access token" 
            size="small" 
            onChange={(e) => {
              setTempAccessToken(e.target.value);
            }}
            sx={{ mt: "15px", width: "250px" }} />
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
        {accessToken !== undefined && projectId !== undefined ?
        <Connect accessToken={accessToken} projectId={projectId}/> :
        <></> }
        <Modal
          open={open}
          onClose={handleClose}>
            <Box sx={styleModal}>
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
              <IconButton onClick={handleClose}><CloseIcon /></IconButton>
            </Box>
              <h2>What is Gitlab repository project-id?</h2>
              <p>Your project's id can be found by going to the homepage of your Gitlab repository. In the picture below an example is highlighted with yellow.</p>
              <Box component='img' src={ProjectIdImage} id="projectIdImage" sx={{ maxHeight: "100%", maxWidth: "100%" }} />
            </Box>

        </Modal>


      </div>
  );
}

export default SendLink;
