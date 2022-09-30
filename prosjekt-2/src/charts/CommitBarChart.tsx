import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ICommit } from "../api/GetCommits";

interface Props{
    cleanedResults: Array<ICommit>;
}

interface CommitDay {
    name: string;
}

function CommitsBarChart({ cleanedResults }:Props){

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    
    let cleanedDay = new Array<CommitDay>;
    let dayCount: { name: string; count: number }[] = [];

    cleanedResults.map((result) => {
        const date = new Date(result.committedDate);
        
        let days_numbered = date.getDay();
        const daysNamed = weekday[days_numbered];
        
        let data = {name: daysNamed};
        cleanedDay.push(data);
        
        cleanedDay.map((result) => {
            !dayCount.some(daysNamed => daysNamed.name === result.name) ?
            dayCount.push({ name: result.name, count: 1 }) // if never counted
            : dayCount[dayCount.map(a => a.name).indexOf(result.name)].count += 1 // if counted previously
        })
        
    });

    return (
        <div style={{ width: "100%", height: 500}} >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                width={500}
                height={300}
                data={dayCount}
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
                <Bar dataKey="count" fill="#B5DEFF" />
                </BarChart>
            </ResponsiveContainer>
        </div>
     );
}

export default CommitsBarChart;
