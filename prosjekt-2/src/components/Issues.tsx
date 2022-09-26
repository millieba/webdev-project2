import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
    accessToken: string;
    projectId: string;
}

function Issues({ accessToken, projectId }: Props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const [cleanResults, setResults] = useState([]);

    const gitlabRepoLink = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" + projectId + "/issues" + "?pagination=keyset&per_page=1000";

    useEffect(() => {
        setError(null);
        setIsLoaded(false);
        const config = {
            headers: { 
                'PRIVATE-TOKEN': accessToken
            }
        };
        axios.get(gitlabRepoLink, config)
            .then(
                (result) => {
                    console.log(result);
                    let data = result.data;
                    setIsLoaded(true);
                    setResponseData(data);
                })
            .catch((error) => {
                console.log(error);
                setIsLoaded(true);
                setError(error.response.data.message);
            })
    }, [accessToken, gitlabRepoLink])

    function getDisplayProperties(displayValue: string, userPick: string, res: any) {
        let chosenDisplayValue = displayValue.split(".");
        if (chosenDisplayValue.length > 1) {
            return res?.[chosenDisplayValue[0]]?.[chosenDisplayValue[1]];
        }

        return res?.[displayValue];
    }

    function cleanUpResponse (res: Array<Object>) {
        res.map((result, i) => {
            console.log(result);
            //setResults.push(object);
    })
        return res;
    }

    if (error) {
        return (
            <div>
                <h3>An error occured: </h3>{error}
            </div>);
    }
    else if (!isLoaded) {
        return <div>Loading...</div>;
    }
    else {
        cleanUpResponse(responseData);

        return (
            <div>
                <h3>Issues</h3>
                {/* REMOVE THIS COMMENT BEFORE DELIVERY: Could also use the useState in UserPick but I think this solution makes it more readable */}
                {/* {displayValue !== "" ? `${header} ${displayValue.replace(/[._]/g, " ")}s` : "Choose one of the following buttons" }</h3> */}
                {/* <ul style={{ listStyleType: "none" }}>
                    {resultData.map((result, i) => (
                        <li key={i}>

                            {getDisplayProperties(displayValue, userPick, result)}
                        </li>
                    ))}
                </ul> */}
            </div>
        );
    }

}
export default Issues;