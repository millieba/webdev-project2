import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { IIssue } from "../api/GetIssues";

interface Props {
    cleanedResults: Array<IIssue>
}

function IssueStateChart({ cleanedResults }: Props) {
    let stateCount = [{ name: "Open", count: 0 }, { name: "Closed", count: 0 }];

    cleanedResults.map((result) => {
        stateCount[stateCount.map(a => a.name).indexOf(result.state)].count += 1
    });

    const colors = ["#C9A7D0", "#8D6B94", "#AB89B2", "#937499", "#D3B1DA", 
                    "#97759E", "#65436C", "#88668F", "#B593BC", "#A17FA8", 
                    "#795780", "#BF9DC6", "#83618A", "#AA88B1", "#A583AC"]

    return (
            <ResponsiveContainer width="100%" height={400}>
                <PieChart height={400}>
                    <Pie
                        dataKey="count"
                        isAnimationActive={true}
                        data={stateCount}
                        label={(state) => state.name}
                        cx="50%"
                        cy="50%"
                        outerRadius={"60%"}
                    >
                        {stateCount.map((entry, index) => (
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

export default IssueStateChart;