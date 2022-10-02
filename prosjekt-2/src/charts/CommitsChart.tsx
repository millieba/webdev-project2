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


    const colors = ["#b593bc", "#ab89b2", "#a17fa8", "#8d6b94", "#83618a", "#795780", "#6f4d76"]

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