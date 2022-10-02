
import {ComposedChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ICommit } from "../api/GetCommits";

interface Props{
    cleanedResults: Array<ICommit>;
}

interface CommitDay {
    name: string;
}

function CommitsBarChart({ cleanedResults }:Props){

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 

    const sorter = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    let cleanedDay = new Array<CommitDay>;
    let dayCount: { name: string; count: number }[] = [];
    
    cleanedResults.map((result) => {

        const date = new Date(result.committedDate);
        const daysNamed = weekday[date.getDay()];
        let data = {name: daysNamed};
        cleanedDay.push(data);
    });

    cleanedDay.map((result) => {
        !dayCount.some(daysNamed => daysNamed.name === result.name) ?
        dayCount.push({ name: result.name, count: 1 }) // if never counted
        : dayCount[dayCount.map(a => a.name).indexOf(result.name)].count += 1 // if counted previously
    })

    // sorting the counted data from Monday to Sunday
    dayCount.sort((a , b) => sorter.indexOf(a.name) - sorter.indexOf(b.name));

    return (
        <div style={{ width: "100%", height: 500 }}>
            <h3>Number of commits for each day in the week</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={dayCount}
                    margin={{
                        top: 5,
                        right: 40,
                        left: 20,
                        bottom: 50,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar name="commit amount" dataKey="count" fill="#B5DEFF" />
                </BarChart>
            </ResponsiveContainer>
        </div>
     );
}

export default CommitsBarChart;
