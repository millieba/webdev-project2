import { ThemeContext } from "./contexts/ThemeContext"
import { useContext } from "react";
import "./App.css";
import Commits from "./components/Commits";
import DisplayValues from "./components/DisplayValues";
import Issues from "./components/Issues";
import SendLink from "./components/SendLink";
import DarkMode from "./components/DarkMode";

function App() {
  const [{theme}] = useContext(ThemeContext); 

  return (
    <div className="App"
    style={{color: theme.textcolor, backgroundColor: theme.backgroundColor}}>
      <DarkMode />
      <SendLink />
    </div>
  );
}

export default App;
