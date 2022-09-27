import { useState, createContext, ReactNode, useEffect } from "react";
//#4e135a
export const themes = {
    dark: {
        backgroundColor: "#4e135a", 
        color: "white", 
    },
    light: {
        backgroundColor: "white",
        color: "black",
    }, 
}

//Solution inspired by a previous project: https://gitlab.stud.idi.ntnu.no/tdt4140-2022/landsby-3/gruppe_38/matnettside/-/blob/main/feedme/src/contexts/theme.js 

export const ThemeContext = createContext<any>({} as any); // Bro idk, but no error message at least 

type ProviderProps = {
    children: ReactNode; 
}

export const ThemeProvider = ({children}: ProviderProps) => { 
    const [isDarkMode, setIsDarkMode] = useState(false); 
    const theme = isDarkMode ? themes.dark : themes.light; 

    const toggle = () => {
        localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode)); 
        setIsDarkMode(!isDarkMode); 
    }; 

    useEffect(() => {
        const isDarkMode = localStorage.getItem("isDarkMode") === "true"; 
        setIsDarkMode(isDarkMode); 
    }, []); 


    return ( 
        <ThemeContext.Provider value={[{theme, isDarkMode}, toggle]}>
            {children}
        </ThemeContext.Provider>
    ); 

}

export default ThemeContext; 