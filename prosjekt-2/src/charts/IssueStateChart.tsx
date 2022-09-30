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
    console.log(stateCount);


    const colors = ["#B5DEFF", "#CAB8FF", "#FCFFA6", "#C1FFD7"]

    return (
        <div style={{ width: "100%", height: 500 }} >
            <ResponsiveContainer>
                <PieChart width={400} height={400}>
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
        </div>
    );
}

export default IssueStateChart;