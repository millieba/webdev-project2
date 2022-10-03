import { useState, createContext, ReactNode, useEffect } from "react";

// boxColor er den overordnede boksen som inneholder views
// boxColor2 er de "små" boksene med info om commitene/issuesene
export const themes = {
  dark: {
    backgroundColor: "#171520",
    textcolor: "white",
    buttonColor: "#58517B",
    darkbutton: "white",
    boxColor: "#241b2f",
    boxColor2: "#463465",
    inputTextColor: "#58517B",
    toggleDarkmode: () => {}, 
  },
  light: {
    backgroundColor: "#e7e0e9",
    color: "#fcf7ff",
    textcolor: "black",
    buttonColor: "#8d6b94",
    darkbutton: "grey",
    boxColor: "#ffffff",
    boxColor2: "#8d6b94",
    inputTextColor: "#58517B",
    toggleDarkmode: () => {},
  },
};

//Solution inspired by a previous project: https://gitlab.stud.idi.ntnu.no/tdt4140-2022/landsby-3/gruppe_38/matnettside/-/blob/main/feedme/src/contexts/theme.js

export const ThemeContext = createContext({ themes });

type ProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ProviderProps) => {
  //Provides global theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? themes.dark : themes.light;

  const toggleDarkMode = () => {
    localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(isDarkMode);
  }, []); 

  return (
    <ThemeContext.Provider value={{ themes }}>
        {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
