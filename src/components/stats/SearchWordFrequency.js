import StatCard from "../StatCard";
import {Bar} from "react-chartjs-2";
import {useTranslation} from "react-i18next";
import {useMemo, useState} from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Fuse from "fuse.js";
import debounce from 'lodash.debounce';

const SearchWordFrequency = ({conversation, className}) => {
    const {t} = useTranslation();
    const [searchString, setString] = useState("super");

    function saveString(value) {
        setString(value);
    }

    const debouncedSave = debounce((val) => saveString(val), 300)

    function wordFreq(string) {
        const words = string.replace(/[.]/g, '').split(/\s/);
        const freqMap = {};
        words.forEach(function (w) {
            if (!freqMap[w]) {
                freqMap[w] = 0;
            }
            freqMap[w] += 1;
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
    const words_array = wordFreq(conversation_string, searchString);

    function wordCount() {
        const options = {
            includeScore: true,
            useExtendedSearch: true,
            keys: ['word']
        }
        const words = [];
        Object.keys(words_array).forEach((key, index) => {
            words[index] = {word: key, count: words_array[key]};
        })
        const fuse = new Fuse(words, options)
        const search = fuse.search(searchString)
        return search.map(result => result.item);
    }

    const data = {
        labels: wordCount().slice(0, 10).map(word => word.word),
        datasets: [
            {
                data: wordCount().slice(0, 10).map(word => word.count),
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
                align: 'end',
                offset: 6
            }
        }
    };

    const plugins = [ChartDataLabels]

    return (
        <StatCard className={className}>
            <div className="flex justify-between">
                <span>{t('search_word_frequency')}</span>
                <div>
                    <input type="text" onInput={event => debouncedSave(event.target.value)} defaultValue={searchString}
                           className="border w-32 dark:bg-gray-800 dark:border-gray-500"/>
                </div>
            </div>
            <Bar data={data} options={options} plugins={plugins}/>
        </StatCard>
    )
}
export default SearchWordFrequency
