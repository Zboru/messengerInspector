import {Bar} from 'react-chartjs-2';
import {useState} from "react";
import StatCard from "../StatCard";
import {useTranslation} from "react-i18next";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const MostFrequentWords = ({conversation, className}) => {
    const {t, i18n} = useTranslation();
    const [stringLength, setLength] = useState(1);


    function wordFreq(string, length = 1) {
        const words = string.replace(/[.]/g, '').split(/\s/);
        const freqMap = {};
        words.forEach(function (w) {
            if (w.length > length) {
                if (!freqMap[w]) {
                    freqMap[w] = 0;
                }
                freqMap[w] += 1;
            }
        });

        // Clear empty 'word'
        freqMap[''] = null;

        return freqMap;
    }

    // Create one, extremely long string containing all words from thread
    let conversation_string = "";
    conversation.messages.forEach(message => {
        if (message.content) {
            conversation_string += `${message.content.toLowerCase()} `;
        }
    })
    // Convert string to frequency map
    const words_array = wordFreq(conversation_string, stringLength);

    function wordCount() {
        return Object.entries(words_array).sort((a, b) => b[1] - a[1]);
    }

    const data = {
        labels: wordCount().slice(0, 10).map(word => word[0]),
        datasets: [
            {
                data: wordCount().slice(0, 10).map(word => word[1]),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                anchor: 'end',
                align: 'start',
                offset: 6
            }
        }
    };

    const plugins = [ChartDataLabels]

    return (
        <StatCard className={className}>
            <div className="flex justify-between">
                <span>{t('most_frequent_words')}</span>
                <div>
                    <input type="number" min={1} max={20} onChange={e => setLength(e.target.value)} value={stringLength}
                           className="border w-10"/>
                    <span>+ {t('most_frequent_words_input')}</span>
                </div>
            </div>
            <Bar data={data} options={options} plugins={plugins}/>
        </StatCard>
    )
}
export default MostFrequentWords
