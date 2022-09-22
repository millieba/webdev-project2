import { useEffect, useState } from "react";

interface Props {
    accessToken: string;
    projectId: string;
    userPick: string;
    displayValue: string;
}

function Connect({ accessToken, projectId, userPick, displayValue }: Props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [resultData, setResult] = useState<any[]>([])

    const gitlabRepoLink = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" + projectId + userPick;
    
    // based on the example in React's Ajax documentation https://reactjs.org/docs/faq-ajax.html
    useEffect(() => {
        fetch(gitlabRepoLink,
            {
                method: 'GET',
                headers: {
                    'PRIVATE-TOKEN': accessToken
                }

            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    (!Array.isArray(result)) ? setResult([result]) : setResult(result);
                    //setResult(initArray => [...initArray, result]);
                    //console.log(typeof resultData);
                    console.log(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    console.log(error);
                })
    }, [accessToken, gitlabRepoLink])

    if (error) {
        return <div>Error: {error}</div>;
    }
    else if (!isLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (<ul style={{ listStyleType: "none" }}>
            {resultData.map((result, i) => (
                <li key={i}>
                    {/* {result."message"} */}
                    {/* {result}.{displayValue */}
                    {result[displayValue]}
                </li>
            ))}
        </ul>
        );
    }
}
export default Connect;