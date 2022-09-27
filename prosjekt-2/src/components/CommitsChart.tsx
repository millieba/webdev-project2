import {ResponsiveContainer, PieChart, Pie, Cell, Tooltip} from "recharts";
import { useEffect, useState } from "react";

interface Props{
    cleanedResultls: Array<any>
}

function CommitChart({cleanedResultls}:Props){
    cleanedResultls.map((result, i) => {
        console.log(result.committer)
    }
    
 
    const colors = ["#6f4d76", "#795780", "#83618a", "#8d6b94", "#a17fa8", "#b593bc", "#c9a7d0"]

    //dummy data
    //const commit_data = [
      //  {name: "Dominika", value:4},
        //{name: "Millie", value: 5},
        //{name: "Karen", value: 7},
        //{name: "Mariell", value: 4}
    //]
  
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
              >
                {commit_data.map((i, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            <Tooltip />
          </PieChart>
      </div>
    );
}
  
export default CommitChart;