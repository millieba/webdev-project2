import { createContext, useState, useEffect } from "react";

const darkTheme = {
    dark: {
        backgroundcolor: "black", 
        color: "white"
    }, 
    light: {
        backgroundcolor: "white", 
        color: "black"
    }, 
}; 

//Remember to add reference from previous project! 

export const ThemeContext = createContext();   

export const ThemeProvider = ({children}) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false); 
    const theme = isDarkTheme ? darkTheme.dark : darkTheme.light; 

    const toggleTheme = () => {
        localStorage.setItem("isDarkTheme", JSON.stringify(!isDarkTheme));
        setIsDarkTheme(!isDarkTheme);  
    }; 

    useEffect(() => {
        const isDarkTheme = localStorage.getItem("isDarkTheme") === "true";  
        setIsDarkTheme(isDarkTheme); 
    }, []); 


    return (
        <ThemeContext.Provider value = {[{theme, isDarkTheme}, toggleTheme]}>
            {children}
        </ThemeContext.Provider>
    )

}



