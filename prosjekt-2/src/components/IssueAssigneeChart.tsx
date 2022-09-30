import {ResponsiveContainer, PieChart, Pie, Cell, Tooltip} from "recharts";

interface Props{
    cleanedResults: Array<any>
}

function AssigneeChart({cleanedResults}:Props){

    // using reduce to loop through the array and sum it into object
    const countAssignee = cleanedResults.reduce( (previous, current) => (
        previous[current.assignees] = (previous[current.assignees] || 0)+1, previous), {} 
    );

    let assigned: Array<any> =[]
    Object.keys(countAssignee).forEach((assignee) => assigned.push(
        {name:assignee, value: countAssignee[assignee]})
    );


    const colors = ["#FFCCF9", "#B5DEFF", "#CAB8FF", "#FCFFA6", "#C1FFD7", "#FFCBC1", "#AFF8DB"]

    return (
        <div style={{ width: "100%", height: 500}} >
            <ResponsiveContainer>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={assigned}
                        label
                        cx="50%"
                        cy="50%"
                        outerRadius={"60%"}
                        >
                        {assigned.map((entry, index) => (
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
  
export default AssigneeChart;
