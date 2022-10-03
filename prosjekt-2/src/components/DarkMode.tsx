import { ThemeContext } from "../contexts/ThemeContext";
import { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export default function DarkMode() {
  const { themes } = useContext(ThemeContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? themes.dark : themes.light;

  const toggleDarkMode = () => {
    localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
    setIsDarkMode(!isDarkMode);
  };

  return (
    <IconButton
      className="darkButton"
      onClick={toggleDarkMode}
      style={{ color: theme.darkbutton }}
    >
      {!isDarkMode ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
}
