import { useEffect, useState } from "react";
import axios from "axios";
import AssigneeChart from "./IssueAssigneeChart"

interface Props {
    accessToken: string;
    projectId: string;
}

function Issues({ accessToken, projectId }: Props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [responseData, setResponseData] = useState([]);
    let cleanedResults: { title: string; description: string; assignees: string; state: string; createdAt: string; }[] = [];

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


    function cleanUpResponse(res: Array<any>) {
        res.map((result, i) => {
            let title = result?.title;
            let description = result?.description === null ? "" : result?.description;
            let createdAt = new Date(result?.created_at);
            let state = result?.state;

            let assigneeArr = result?.assignees;
            let assigneeNames = new Array<String>();
            assigneeArr.length === 0 ? assigneeNames.push("Unassigned") : (assigneeArr.map((assignee: any, i: number) => {
                assigneeNames.push(assignee?.name);
            }))


            let issueObj = { title: title, description: description.replace(/[\r\n]+/g, ""), createdAt: createdAt.toDateString(), assignees: assigneeNames.toString(), state: state };
            cleanedResults.push(issueObj);
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
                <h3>Issues</h3>
                <AssigneeChart cleanedResults={cleanedResults}/>
                <ul style={{ listStyleType: "none" }}>
                    {cleanedResults.map((result, i) => (
                        <li key={i}>
                            Title: {result.title} ///
                            Description: {result.description} ///
                            Assigneed to: {result.assignees} ///
                            State: {result.state} ///
                            Created at: {result.createdAt}<br /><br />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

}
export default Issues;