import Commits from "../components/Commits";


interface Props {
    accessToken: string;
    projectId: string;
}

function Connect({ accessToken, projectId}: Props) {
        return (
            <div>
                    <Commits accessToken={accessToken} projectId={projectId}/>
            </div>
        );
}
export default Connect;