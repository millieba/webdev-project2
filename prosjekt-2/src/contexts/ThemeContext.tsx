import { useState, createContext, ReactNode, useEffect } from "react";

//boxColor is the parent box that contains the views
//boxColor2 are the "little" boxes that have information about the commits/issues
export const themes = {
  dark: {
    backgroundColor: "#171520",
    textcolor: "white",
    buttonColor: "#58517B",
    darkbutton: "white",
    boxColor: "#241b2f",
    boxColor2: "#463465",
    inputTextColor: "#58517B",
    paginationColor: "#5D4587",
  },
  light: {
    backgroundColor: "#e7e0e9",
    color: "#fcf7ff",
    textcolor: "black",
    buttonColor: "#8d6b94",
    darkbutton: "grey",
    boxColor: "#ffffff",
    boxColor2: "#b593bc",
    inputTextColor: "#58517B",
    paginationColor: "#c5abcb",
  },
};

//Solution inspired by a previous project: https://gitlab.stud.idi.ntnu.no/tdt4140-2022/landsby-3/gruppe_38/matnettside/-/blob/main/feedme/src/contexts/theme.js

export const ThemeContext = createContext({} as any); //Props should probably have been used here instead of "any"

 //Had to use props to specify type, children can't be of type "any"
type ProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false); //Default state is light the first time a user enters the page 
  const theme = isDarkMode ? themes.dark : themes.light;

  const toggleDarkTheme = () => {
    localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode)); //Allows the user to toggle between light and dark mode, i.e. sets the mode using setItem()
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem("isDarkMode") === "true"; //Without this function the page will revert to light mode on page-refresh, local storage remembers the state chosen
    setIsDarkMode(isDarkMode);
  }, []);

  return (
    <ThemeContext.Provider value={[{ theme, isDarkMode }, toggleDarkTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
