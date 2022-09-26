import { PaletteMode } from "@mui/material";

// Theme for the MUI-components (does ONLY work on MUI-components)
export const theme = (mode: PaletteMode) => ({
    palette: {
        mode, 
        ...(mode === "light"
        ? {
            //values for light mode
            primary: "#8d6b94", 
            secondary: "#9dbbae", 
            //DEFINE COLOUR FOR TEXT HERE 
        } 
        : {
            //values for dark mode
            //Define colours for dark mode here, background and text 
        }), 
    }, 
}); 

  