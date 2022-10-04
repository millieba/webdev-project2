import TextField from '@mui/material/TextField';
import { Button, IconButton, InputAdornment, Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Modal from '@mui/material/Modal';
import ProjectIdImage from '../images/project-id.png';
import CloseIcon from '@mui/icons-material/Close';
import Connect from '../api/Connect';
import ThemeContext from '../contexts/ThemeContext';
import Headline from './Headline';

// Styling of the popup modal
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

const emojis = ["💜", "🔮", "🌌", "🍇", "🎆", "☂️", "🎶", "👾", "🟣", "🪀", "🦄",
  "💫", "🌠", "🌃", "🍨", "🐇", "🦢", "🐁", "📋", "🤍", "🐘"];
const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

// Save random emoji to sessionStorage
sessionStorage.setItem("emoji", randomEmoji);


function UserInput() {
  const [{ theme }] = useContext(ThemeContext);
  const [disableButton, setDisableButton] = useState(true); // Always disable the button if user has not typed in something into the input fields
  const [open, setOpen] = useState(false); // Indicates whether the modal is open or not

  // Functions for the information modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // To avoid sending new variables all the time to the API useeffect dependencies
  const [tempAccessToken, setTempAccessToken] = useState<string>();
  const [tempProjectId, setTempProjectId] = useState<string>();

  // The variables we pass as props to the API <Connect />
  const [accessToken, setAccessToken] = useState<string>();
  const [projectId, setProjectId] = useState<string>();

  // Styles the textfields that take in project id and access token
  const styleTextField = {
    mt: "15px",
    width: "250px",
    input: {
      color: theme.textcolor
    },
    "& label": {
      color: theme.inputTextColor
    },
    "& label.Mui-focused": {
      color: theme.inputTextColor
    },
    "&:hover label": {
      color: theme.inputTextColor
    },
    "& .MuiInput-underline:after": {
      color: theme.inputTextColor
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.inputTextColor
      },
      "&:hover fieldset": {
        borderColor: theme.inputTextColor
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.inputTextColor
      }
    }

  }

  // Check everytime tempAccessToken or tempProjectId changes - if user has typed in something in both input fields to enable button
  useEffect(() => {
    if (tempAccessToken && tempProjectId && validateInputFields(tempAccessToken, tempProjectId)) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [tempAccessToken, tempProjectId]);

  // Ensure that the user does not give invalid input
  function validateInputFields(accessToken: string, projectId: string) {
    if (projectId === undefined || !projectId.match(/\d+/))
      return false;
    if (accessToken === undefined || !accessToken.match(/[\w-+~.=/]+/))
      return false;

    return true;
  }

  return (
    <div>
      <Headline />

      <Box>
        {/* Input fields */}
        <TextField
          id="send-link-field"
          variant='filled'
          label="GitLab repo project id"
          size="small"
          onChange={(e) => {
            setTempProjectId(e.target.value);
          }}
          sx={styleTextField}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton style={{ color: theme.textcolor }}
                  onClick={handleOpen}>
                  <HelpOutlineIcon />
                </IconButton>
              </InputAdornment>
            )
          }} />

        <br />

        <TextField
          id="access-token-field"
          variant='filled'
          label="Access token"
          size="small"
          onChange={(e) => {
            setTempAccessToken(e.target.value);
          }}
          sx={styleTextField} />

        <br />

          {/* Submit button */}
        <Button
          style={{ backgroundColor: theme.buttonColor }}
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

        {/* Modal that popups when user clicks on "?"-button */}
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

export default UserInput;
