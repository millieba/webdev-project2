import {ResponsiveContainer, PieChart, Pie, Cell, Tooltip} from "recharts";

interface Props{
    cleanedResults: Array<any>
}

function IssueStateChart({cleanedResults}:Props){

    const stateCounter = cleanedResults.reduce( (previous, current) => (
         previous[current.state] = (previous[current.state] || 0)+1, previous), {} 
     );

     let state_data: Array<any> =[]
     Object.keys(stateCounter).forEach((state) => state_data.push(
         {name:state, value: stateCounter[state]})
     );

    const colors = [ "#B5DEFF", "#CAB8FF", "#FCFFA6", "#C1FFD7"]

    return (
        <div style={{ width: "100%", height: 500}} >
            <ResponsiveContainer>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={state_data}
                        label
                        cx="50%"
                        cy="50%"
                        outerRadius={"60%"}
                        >
                        {state_data.map((entry, index) => (
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