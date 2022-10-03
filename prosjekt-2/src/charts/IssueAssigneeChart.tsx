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
                    "#795780", "#BF9DC6", "#83618A", "#AA88B1"]

    //const colors = ["#FFCCF9", "#B5DEFF", "#CAB8FF", "#C1FFD7", "#FFCBC1", 
                    //"#AFF8DB", "#ABDEE6", "#FFCCB6", "#C0E4F6", "#F3B0C3", 
                   // "#A2D2FF", "#FF968A", "#FFC8A2", "#CCE2CB", "#97C1A9", 
                   // "#FEE1E8", "#A2E1DB", "#DEFDE0", "#ECD5E3", "#FCFFA6"]

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
