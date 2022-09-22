import { Box, Button } from "@mui/material";
import { useState } from "react";
import SendLink from "./SendLink";

function UserPick() {

    const [userRequest, setUserRequest] = useState<string>("");
    const [displayValue, setDisplayValue] = useState<string>("");

    return (
        // To adjust the colors on the MUI-components, use theme in index.tsx
        <>
            <SendLink userPick={userRequest} displayValue={displayValue} />
            <Box sx={{ m: "15px" }}>
                <Button variant="outlined" 
                    onClick={() => {
                        setUserRequest("/repository/commits");
                        setDisplayValue("message");
                    }}
                    sx={{ ml: "15px" }}>
                    Commits 
                </Button>
                <Button variant="outlined"
                onClick={() => {
                    setUserRequest("/issues");
                    setDisplayValue("description");
                }}
                sx={{ ml: "15px" }}>
                    Issues
                </Button>
            </Box>
        </>
    );
}

export default UserPick;
