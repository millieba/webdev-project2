import { useState, createContext, ReactNode, useEffect } from "react";

interface IThemes {
    dark: {
        backgroundColor: string, 
        textcolor: string, 
        buttonColor: string,   
        darkbutton: string, 
        boxColor: string, 
        boxColor2: string, 
        inputTextColor: string, 
    }, 
    light: {
        backgroundColor: string, 
        color: string,
        textcolor: string, 
        buttonColor: string,   
        darkbutton: string, 
        boxColor: string, 
        boxColor2: string, 
        inputTextColor: string, 
    }, 
    toggle: () => void; 
}



// boxColor er den overordnede boksen som inneholder views
// boxColor2 er de "små" boksene med info om commitene/issuesene
export const themes: IThemes = {
    dark: {
        backgroundColor: "#171520",
        textcolor: "white", 
        buttonColor: "#58517B",  
        darkbutton: "white",
        boxColor: '#241b2f',
        boxColor2: '#463465',
        inputTextColor: "#58517B",
    },
    light: {
        backgroundColor: "#e7e0e9",
        color: "#fcf7ff",
        textcolor: "black",
        buttonColor: "#8d6b94", 
        darkbutton: "grey",
        boxColor: '#ffffff',
        boxColor2: '#8d6b94',
        inputTextColor: "#58517B",
    },
    toggle: () => {},
}

//Solution inspired by a previous project: https://gitlab.stud.idi.ntnu.no/tdt4140-2022/landsby-3/gruppe_38/matnettside/-/blob/main/feedme/src/contexts/theme.js 

export const ThemeContext = createContext(typeof themes); 

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
        <ThemeContext.Provider value={[{theme}, toggle]}>  
            {children}
        </ThemeContext.Provider>
    ); 

}

export default ThemeContext; 