import { useState, createContext, ReactNode, useEffect } from "react";



export const themes = {
    dark: {
        backgroundColor: "#4e135a", 
        textcolor: "white", 
        buttonColor: "#430c69",  
        darkbutton: "white"
    },
    light: {
        backgroundColor: "white",
        textcolor: "grey",
        buttonColor: "#8d6b94", 
        darkbutton: "grey"
    }, 
}

//Solution inspired by a previous project: https://gitlab.stud.idi.ntnu.no/tdt4140-2022/landsby-3/gruppe_38/matnettside/-/blob/main/feedme/src/contexts/theme.js 

export const ThemeContext = createContext<any>({} as any); // Bro idk, but no error message at least 

type ProviderProps = {
    children: ReactNode; 
}

export const ThemeProvider = ({children}: ProviderProps) => {   //Provides global theme 
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