import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export default function DarkMode() {
  const [{ theme,  isDarkMode }, toggle] = useContext(ThemeContext);

  return (
    <IconButton className="darkButton" onClick={toggle} style={{color: theme.darkbutton}}>
      {!isDarkMode ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
} 
