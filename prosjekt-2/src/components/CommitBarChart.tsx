import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props{
    cleanedResults: Array<any>
}

function CommitsBarChart({cleanedResults}:Props){
    // cleanedResults.map((result,i) =>{
    //     let croppedDate = result.committedDate
    //     croppedDate = croppedDate.slice(0,3);
    //     console.log(croppedDate);
    // }
    // );

    // using reduce to loop through the array and sum it into object
    const countDays = cleanedResults.reduce( (previous, current) => (
        previous[current.committedDate] = (previous[current.committedDate] || 0)+1, previous), {} 
    );
    //console.log(countDays)

    let commit_day: Array<any> =[]
    Object.keys(countDays).forEach((committedDate) => commit_day.push(
        {name:committedDate, amount: countDays[committedDate]})
    );

    // const commit_day =[
    //     {name: "mon", amount:5},
    //     {name: "tue", amount :7}
    // ]

    const colors = ["#FFCCF9", "#B5DEFF", "#CAB8FF", "#FCFFA6", "#C1FFD7", "#FFCBC1", "#AFF8DB"]

    return (
        <div style={{ width: "100%", height: 500}} >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                width={500}
                height={300}
                data={commit_day}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
     );
}

export default CommitsBarChart;
