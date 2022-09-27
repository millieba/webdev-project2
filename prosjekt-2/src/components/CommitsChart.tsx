import {ResponsiveContainer, PieChart, Pie, Cell, Tooltip} from "recharts";
import { useEffect, useState } from "react";
import { createSecureContext } from "tls";

interface Props{
    cleanedResultls: Array<any>
}

function CommitChart({cleanedResultls}:Props){
    cleanedResultls.forEach((result) => {
        console.log(result.committer)
    });

    const nameOccurrences = cleanedResultls.reduce( (previous, current) => (previous[current.committer] = (previous[current.committer] || 0)+1, previous), {} );
        console.log(nameOccurrences)

    let commit_data: Array<any> =[]
    Object.keys(nameOccurrences).forEach((committer) => commit_data.push({name:committer, value: nameOccurrences[committer]}))
    console.log(commit_data)

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
                data={commit_data}
                cx="50%"
                cy="50%"
                outerRadius={"80%"}
                fill="#8884d8"
                label
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