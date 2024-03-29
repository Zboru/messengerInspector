import StatCard from "../StatCard";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const BestPeriod = ({conversation}) => {
    const {t, i18n} = useTranslation();
    const [selectedPeriod, setPeriod] = useState("year");
    const [result, setResult] = useState([]);

    function messagesByPeriod(period) {
        const periods = {};
        let dateSliceEnd = 4;
        conversation.messages.forEach(message => {
            if (period === 'year') dateSliceEnd = 4;
            if (period === 'month') dateSliceEnd = 7;
            if (period === 'day') dateSliceEnd = 10;
            const date = new Date(message.timestamp_ms).toJSON().slice(0, dateSliceEnd);
            if (periods[date]) {
                periods[date]++
            } else {
                periods[date] = 1;
            }
        })
        const sortedPeriods = Object.entries(periods).sort((a, b) => b[1] - a[1]);
        setResult(sortedPeriods[0]);
    }

    useEffect(()=>{
        messagesByPeriod(selectedPeriod);
    },[selectedPeriod, conversation])

    return (
        <StatCard>
            <div className="flex justify-between">
                <span>{t('best_period')}</span>
                <select className="border dark:border-gray-500 dark:bg-gray-800" onChange={e => setPeriod(e.target.value)} value={selectedPeriod} name="period" id="period">
                    <option value="day">{t('day')}</option>
                    <option value="month">{t('month')}</option>
                    <option value="year">{t('year')}</option>
                </select>
            </div>
            {result && <div className="flex h-full justify-center flex-col">
                <p className="text-2xl text-center">{result[0]}</p>
                <p className="text-3xl text-center">{result[1]} {t('period_messages_abbr')}</p>
            </div>}
        </StatCard>
    )
}
export default BestPeriod
