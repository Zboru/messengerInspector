import StatCard from "../StatCard";
import {Line} from 'react-chartjs-2';
import {useEffect, useState} from "react";

const YearOverview = ({conversation, className}) => {
    const [statYear, setYear] = useState(new Date().getFullYear());

    const months = {};
    conversation.messages.forEach(message => {
        const month = new Date(message.timestamp_ms).toJSON().slice(0, 7);
        if (!months[month]) {
            months[month] = 1;
        } else {
            months[month]++;
        }
    })

    function getYearMonths(year) {
        const filteredMonths = [];
        Object.keys(months).forEach(month => {
            if (month.slice(0,4) === year) filteredMonths.push(month);
        })
        return filteredMonths;
    }

    function getYears() {
        return [...new Set(Object.keys(months).map(month => month.slice(0,4)))];
    }

    const data = {
        labels: getYearMonths(statYear),
        datasets: [
            {
                data: getYearMonths(statYear).map(month => months[month]),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    useEffect(()=>{
        setYear(getYears()[0]);
    },[conversation])

    return (
        <StatCard className={className}>
            <div className="flex justify-between">
                <span>Liczba wiadomości w ciągu roku</span>
                <select className="border" value={statYear} onChange={e => setYear(e.target.value)} name="year" id="year">
                    {getYears().map(year => {
                       return <option key={year} value={year}>{year}</option>
                    })}
                </select>
            </div>
            <Line data={data} options={options}/>
        </StatCard>
    )
}
export default YearOverview
