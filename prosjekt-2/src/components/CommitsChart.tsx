import {PieChart, Pie, Cell, Tooltip} from "recharts";

interface Props{
    cleanedResultls: Array<any>
}

function CommitChart({cleanedResultls}:Props){

    const nameOccurrences = cleanedResultls.reduce( (previous, current) => (
        previous[current.committer] = (previous[current.committer] || 0)+1, previous), {} 
    );

    let commit_data: Array<any> =[]
    Object.keys(nameOccurrences).forEach((committer) => commit_data.push(
        {name:committer, value: nameOccurrences[committer]})
    );

    const colors = ["#6f4d76", "#795780", "#83618a", "#8d6b94", "#a17fa8", "#b593bc", "#c9a7d0"]
  
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