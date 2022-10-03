import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { ICommit } from "../api/GetCommits";

interface Props {
    cleanedResults: Array<ICommit>
}

function CommitsChart({ cleanedResults }: Props) {

    let committerCount: { name: string; count: number }[] = [];
    cleanedResults.map((result) => {
        !committerCount.some(committer => committer.name === result.committer) ?
            committerCount.push({ name: result.committer, count: 1 }) // if never counted
            : committerCount[committerCount.map(a => a.name).indexOf(result.committer)].count += 1 // if counted previously
    });

    const colors = ["#C9A7D0", "#8D6B94", "#AB89B2", "#D3B1DA", "#97759E", 
                    "#65436C", "#B593BC", "#88668F", "#A17FA8", "#937499",
                    "#795780", "#BF9DC6", "#83618A", "#AA88B1"]

    return (
            <ResponsiveContainer width="100%" height={400}>
                <PieChart height={400}>
                    <Pie
                        dataKey="count"
                        isAnimationActive={true}
                        data={committerCount}
                        label={(committer) => committer.name}
                        cx="50%"
                        cy="50%"
                        outerRadius={"60%"}
                    >
                        {committerCount.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />))
                        }
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
     );
}

export default CommitsChart;