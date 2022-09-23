import { Box, Button } from "@mui/material";
import { useState } from "react";
import SendLink from "./SendLink";

function UserPick() {
    // initialisert med issues, kan endre senere
    const [userRequest, setUserRequest] = useState<string>("/issues");
    const [displayValue, setDisplayValue] = useState<string>("assignee name");
    const [header, setHeader] = useState<string>("Issue");

    return (
        // To adjust the colors on the MUI-components, use theme in index.tsx
        <>
            <SendLink userPick={userRequest} displayValue={displayValue} header={header} />
            <Box sx={{ m: "15px" }}>
                <Button variant="outlined" 
                    onClick={() => {
                        setUserRequest("/repository/commits");
                        setDisplayValue("message");
                        setHeader("Commit")
                    }}
                    sx={{ ml: "15px" }}>
                    Commits 
                </Button>
                <Button variant="outlined"
                onClick={() => {
                    setUserRequest("/issues");
                    setDisplayValue("assignee name");
                    setHeader("Issue");
                }}
                sx={{ ml: "15px" }}>
                    Issues
                </Button>
            </Box>
        </>
    );
}

export default UserPick;
