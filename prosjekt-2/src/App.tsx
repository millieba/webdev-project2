import { ThemeContext } from "./contexts/ThemeContext";
import { useContext, useState } from "react";
import "./App.css";
import UserInput from "./components/UserInput";
import DarkMode from "./components/DarkMode";
import { GlobalStyles } from "@mui/material";

function App() {
  const { themes } = useContext(ThemeContext);
  const [isDarkMode] = useState(false);
  
  const theme = isDarkMode ? themes.dark : themes.light;

  return (
    <div
      className="App"
      style={{ color: theme.textcolor, backgroundColor: theme.backgroundColor }}>
      <GlobalStyles
        styles={{ body: { backgroundColor: theme.backgroundColor } }}/>
      <DarkMode />
      <UserInput />
    </div>
  );
}

export default App;
