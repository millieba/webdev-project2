import GetCommits from "./GetCommits";
import GetIssues from "./GetIssues";


interface Props {
    accessToken: string;
    projectId: string;
}

function Connect({ accessToken, projectId }: Props) {
    return (
        <>
            <GetCommits accessToken={accessToken} projectId={projectId} />
            <GetIssues accessToken={accessToken} projectId={projectId} />
        </>
    );
}
export default Connect;