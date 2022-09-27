import {ResponsiveContainer, PieChart, Pie, Cell, Tooltip} from "recharts";
import { useEffect, useState } from "react";

interface Props{
    cleanedResultls: Array<any>
}

function CommitChart({cleanedResultls}:Props){
    cleanedResultls.forEach((result) => {
        console.log(result.committer)
        
        //cleanedResultls.push({name: result?.committer, value: cleanedResultls[result.committer]})
    });

    const countOccurrences = cleanedResultls.reduce( (acc, o) => (acc[o.committer] = (acc[o.committer] || 0)+1, acc), {} );
        console.log(countOccurrences)

    const colors = ["#6f4d76", "#795780", "#83618a", "#8d6b94", "#a17fa8", "#b593bc", "#c9a7d0"]

    //dummy data
    const dummy_data = [
        {name: "Dominika", value:4},
        {name: "Millie", value: 5},
        {name: "Karen", value: 7},
        {name: "Mariell", value: 4}
    ]
  
    return (
        <div className="chart">
            <PieChart width={400} height={400}>
                <Pie
                dataKey="value"
                isAnimationActive={true}
                data={countOccurrences}
                cx="50%"
                cy="50%"
                outerRadius={"80%"}
                fill="#8884d8"
                >
                    {cleanedResultls.map((i, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
     );
}
  
export default CommitChart;