import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { IIssue } from "../api/GetIssues";

interface Props {
    cleanedResults: Array<IIssue>
}

function IssueAssigneeChart({ cleanedResults }: Props) {

    let assigneeCount: { name: string; count: number }[] = [];
    cleanedResults.map((result) => {
        !assigneeCount.some(assignee => assignee.name === result.assignees) ?
            assigneeCount.push({ name: result.assignees, count: 1 }) // if never counted
            : assigneeCount[assigneeCount.map(a => a.name).indexOf(result.assignees)].count += 1 // if counted previously
    });

    const colors = ["#C9A7D0", "#8D6B94", "#AB89B2", "#D3B1DA", "#97759E", 
                    "#65436C", "#B593BC", "#88668F", "#A17FA8", "#937499",
                    "#795780", "#BF9DC6", "#83618A", "#AA88B1", "#A583AC"]

    return (
            <ResponsiveContainer width="100%" height={400}>
                <PieChart height={400}>
                    <Pie
                        dataKey="count"
                        isAnimationActive={true}
                        data={assigneeCount}
                        label={(assignee) => assignee.name}
                        cx="50%"
                        cy="50%"
                        outerRadius={"60%"}
                    >
                        {assigneeCount.map((entry, index) => (
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

export default IssueAssigneeChart;
