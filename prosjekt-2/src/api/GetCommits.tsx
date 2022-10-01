import { useEffect, useState } from "react";
import axios from "axios";
import CommitsViews from '../components/CommitsViews';

interface Props {
    accessToken: string;
    projectId: string;
}

export interface ICommit {
    committer: string;
    committedDate: string;
    commitMessage: string;
}

interface IResponse {
    committer_name: string;
    committed_date: string;
    title: string;
}

function GetCommits({ accessToken, projectId }: Props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [responseData, setResponseData] = useState([]);
    let cleanedResults = new Array<ICommit>;

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

    function cleanUpResponse(res: Array<IResponse>) {
        res.map((result) => {
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
            <>
                {cleanedResults.length === 0
                    ? <h4>Sorry, there are no commits in the repository you requested</h4>
                    : <CommitsViews cleanedResults={cleanedResults} />}
            </>
        );
    }

}
export default GetCommits;