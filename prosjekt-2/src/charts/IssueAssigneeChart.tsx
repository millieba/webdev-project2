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
    console.log(cleanedResults);


    const colors = ["#FFCCF9", "#B5DEFF", "#CAB8FF", "#FCFFA6", "#C1FFD7", "#FFCBC1", "#AFF8DB"]

    return (
        <div style={{ width: "100%", height: 500 }} >
            <ResponsiveContainer>
                <PieChart width={400} height={400}>
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
        </div>
    );
}

export default IssueAssigneeChart;
