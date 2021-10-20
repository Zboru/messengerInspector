import {Pie} from 'react-chartjs-2';
import StatCard from "../StatCard";
import {useTranslation} from "react-i18next";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const WordsPerUser = ({conversation}) => {
    const {t} = useTranslation();
    const participantsWords = conversation.participants.map(participant => {
        let wordCount = 0;
        conversation.messages.forEach(message => {
            if (message.sender_name === participant.name && message.content) {
                const words = message.content.split(" ");
                wordCount += words.length;
            }
        })
        return {name: participant.name, wordCount}
    })

    const data = {
        labels: participantsWords.map(participant => participant.name),
        datasets: [{
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
            data: participantsWords.map(participant => participant.wordCount),
            borderWidth: 1,
        }]
    }

    const options = {
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'center',
                offset: 6,
            }
        }
    };

    const plugins = [ChartDataLabels]

    return (
        <StatCard>
            <p>{t('words_per_user')}</p>
            <Pie data={data} options={options} plugins={plugins}/>
        </StatCard>
    )
}
export default WordsPerUser
