import { ThemeContext } from "./contexts/ThemeContext"
import { useContext } from "react";
import "./App.css";
import UserInput from "./components/UserInput";
import DarkMode from "./components/DarkMode";
import { GlobalStyles } from "@mui/material";

function App() {
  const [{theme}] = useContext(ThemeContext); 

  return (
    <div className="App"
    style={{color: theme.textcolor, backgroundColor: theme.backgroundColor }}>
      <GlobalStyles styles={{ body: { backgroundColor: theme.backgroundColor } }} />
      <DarkMode />
      <UserInput />
    </div>
  );
}

export default App;
