import { useEffect, useState } from "react";
import axios from "axios";
import CommitsBarChart from "./CommitBarChart"

interface Props {
    accessToken: string;
    projectId: string;
}

function Commits({ accessToken, projectId }: Props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [responseData, setResponseData] = useState([]);
    let cleanedResults: { committer: string; committedDate: string; commitMessage: string; }[] = [];

    const gitlabRepoLink = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" + projectId + "/repository/commits" + "?pagination=keyset&per_page=1000";

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

    function cleanUpResponse(res: Array<any>) {
        res.map((result, i) => {
            let committer = result?.committer_name;
            let committedDate = new Date(result?.committed_date);
            let commitMessage = result?.title;
            cleanedResults.push({ committer: committer, committedDate: committedDate.toDateString(), commitMessage: commitMessage });
        })
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
                <h3>Commits</h3>
                <CommitsBarChart cleanedResults = {cleanedResults}/>
                {cleanedResults.map((result, i) => (
                    <div key={i}>
                        Committer: {result.committer} ///
                        Date committed: {result.committedDate} ///
                        Message: {result.commitMessage}
                        <br />
                        <br />
                    </div>
                ))}
            </div>
        );
    }

}
export default Commits;