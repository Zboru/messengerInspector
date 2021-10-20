import StatCard from "../StatCard";
import {useTranslation} from "react-i18next";
import {Line} from "react-chartjs-2";

const AverageDayActivity = ({conversation, className}) => {
    const {t} = useTranslation();

    const dates = {}
    conversation.messages.forEach(message => {
        const date = new Date(message.timestamp_ms).toJSON();
        const dateString = date.slice(0, 10);
        const hourString = date.slice(11, 13);
        if (dates[dateString]) {
            if (dates[dateString][hourString]) {
                dates[dateString][hourString] += 1;
            } else {
                dates[dateString][hourString] = 1;
            }
        } else {
            dates[dateString] = {}
        }
    })

    const hoursCount = {}
    Object.keys(dates).forEach(date => {
        const hours = Object.keys(dates[date]);
        hours.forEach(hour => {
            const count = dates[date][hour];
            if (hoursCount[hour]) {
                hoursCount[hour].count += count;
                hoursCount[hour].days += 1;
            } else {
                hoursCount[hour] = {
                    count: count,
                    days: 1
                }
            }
        })
    })
    const avgHours = []
    Object.keys(hoursCount).forEach(k => {
        avgHours[parseInt(k)] = hoursCount[k].count / hoursCount[k].days;
    })

    const data = {
        labels: Object.keys(hoursCount).sort(),
        datasets: [
            {
                data: avgHours,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: false
            }
        },
        plugins: {
            legend: {
                display: false
            },
        }
    };

    return (
        <StatCard className={className}>
            <p>{t('average_day_activity')}</p>
            <Line data={data} options={options}/>
        </StatCard>
    )
}
export default AverageDayActivity
