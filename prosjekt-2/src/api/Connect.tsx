import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
    accessToken: string;
    projectId: string;
    userPick: string;
    displayValue: string;
    header: string;
}

function Connect({ accessToken, projectId, userPick, displayValue, header }: Props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [resultData, setResult] = useState([])

    const gitlabRepoLink = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" + projectId + userPick;

    useEffect(() => {
        setError(null);
        setIsLoaded(false);
        const config = {
            headers: { 'PRIVATE-TOKEN': accessToken }
        };
        axios.get(gitlabRepoLink, config)
            .then(
                (result) => {
                    console.log(result);
                    let data = result.data;
                    setIsLoaded(true);
                    setResult(data);
                })
            .catch((error) => {
                console.log(error);
                setIsLoaded(true);
                setError(error.response.data.message);
            })
    }, [accessToken, gitlabRepoLink])

    function getDisplayProperties (displayValue: string, userPick: string, res: any){
        // to make the code more general and reusable we could have displayvalue on the format 
        // property1.property2, split the string on "." and assign the two properties to variables, e.g. p1 and p2
        // then return res?.[p1]?.[p2]. That way the wanted displayValues can be passed in one prop, then assessed here
        if (userPick === "/issues" && displayValue === "assignee name") {
            return res?.assignee?.name;
        }
        else {
            return res?.[displayValue];
        }
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


        return (
            <div>
                <h3>{header} {displayValue}s</h3>
                <ul style={{ listStyleType: "none" }}>
                    {resultData.map((result, i) => (
                        <li key={i}>
                            {getDisplayProperties(displayValue, userPick, result)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default Connect;